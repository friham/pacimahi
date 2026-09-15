const pool = require('../config/db');
const { recordAuditLog } = require('./auditLogController');

const buildMenuTree = (items, parentId = null) => {
  const branch = [];
  items
    .filter(item => {
      if (parentId === null) {
        return item.parent_id === null || item.parent_id === 0 || item.parent_id === undefined;
      }
      return Number(item.parent_id) === Number(parentId);
    })
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
    .forEach(item => {
      const children = buildMenuTree(items, item.id);
      branch.push({
        ...item,
        children: children.length > 0 ? children : []
      });
    });
  return branch;
};

const getMenus = async (req, res) => {
  try {
    const { status } = req.query;
    let query = 'SELECT * FROM menus';
    const params = [];

    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }
    query += ' ORDER BY parent_id ASC, sort_order ASC, id ASC';

    const [rows] = await pool.execute(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('getMenus error:', error);
    res.status(500).json({ success: false, message: 'Gagal mengambil data menu.' });
  }
};

const getMenuTree = async (req, res) => {
  try {
    
    const hasAuth = !!(req.headers.authorization && req.headers.authorization.startsWith('Bearer '));
    const isPublic = req.query.scope === 'public' || !hasAuth;
    let query = 'SELECT * FROM menus';
    const params = [];

    if (isPublic) {
      query += " WHERE status = 'published'";
    }
    query += ' ORDER BY sort_order ASC, id ASC';

    const [rows] = await pool.execute(query, params);
    const tree = buildMenuTree(rows, null);

    res.json({
      success: true,
      data: tree
    });
  } catch (error) {
    console.error('getMenuTree error:', error);
    res.status(500).json({ success: false, message: 'Gagal mengambil struktur pohon menu.' });
  }
};

const createMenu = async (req, res) => {
  try {
    const {
      title,
      slug,
      parent_id,
      type = 'page',
      url,
      icon,
      sort_order = 0,
      status = 'published',
      open_new_tab = false,
      description
    } = req.body;

    if (!title || !slug) {
      return res.status(400).json({
        success: false,
        message: 'Nama menu dan slug wajib diisi.'
      });
    }

    const cleanParentId = parent_id && Number(parent_id) > 0 ? Number(parent_id) : null;

    const [result] = await pool.execute(
      `INSERT INTO menus (title, slug, parent_id, type, url, icon, sort_order, status, open_new_tab, description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        slug,
        cleanParentId,
        type,
        url || null,
        icon || null,
        Number(sort_order) || 0,
        status,
        open_new_tab ? 1 : 0,
        description || null
      ]
    );

    await recordAuditLog({
      adminId: req.user?.id,
      adminName: req.user?.name || req.user?.username,
      action: 'CREATE_MENU',
      objectType: 'menu',
      objectId: result.insertId,
      details: `Membuat menu baru: "${title}" (slug: ${slug})`,
      ip: req.ip
    });

    res.status(201).json({
      success: true,
      message: 'Menu berhasil dibuat.',
      data: { id: result.insertId }
    });
  } catch (error) {
    console.error('createMenu error:', error);
    res.status(500).json({ success: false, message: 'Gagal membuat menu baru.' });
  }
};

const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      parent_id,
      type,
      url,
      icon,
      sort_order,
      status,
      open_new_tab,
      description
    } = req.body;

    if (!title || !slug) {
      return res.status(400).json({
        success: false,
        message: 'Nama menu dan slug wajib diisi.'
      });
    }

    const cleanParentId = parent_id && Number(parent_id) > 0 ? Number(parent_id) : null;
    if (cleanParentId === Number(id)) {
      return res.status(400).json({
        success: false,
        message: 'Menu tidak dapat menjadi parent untuk dirinya sendiri.'
      });
    }

    await pool.execute(
      `UPDATE menus SET 
        title = ?, 
        slug = ?, 
        parent_id = ?, 
        type = ?, 
        url = ?, 
        icon = ?, 
        sort_order = ?, 
        status = ?, 
        open_new_tab = ?, 
        description = ?,
        updated_at = NOW()
       WHERE id = ?`,
      [
        title,
        slug,
        cleanParentId,
        type || 'page',
        url || null,
        icon || null,
        Number(sort_order) || 0,
        status || 'published',
        open_new_tab ? 1 : 0,
        description || null,
        id
      ]
    );

    await recordAuditLog({
      adminId: req.user?.id,
      adminName: req.user?.name || req.user?.username,
      action: 'UPDATE_MENU',
      objectType: 'menu',
      objectId: id,
      details: `Mengubah menu: "${title}"`,
      ip: req.ip
    });

    res.json({ success: true, message: 'Menu berhasil diperbarui.' });
  } catch (error) {
    console.error('updateMenu error:', error);
    res.status(500).json({ success: false, message: 'Gagal memperbarui menu.' });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const [existing] = await pool.execute('SELECT * FROM menus WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Menu tidak ditemukan.' });
    }

    const menuTitle = existing[0].title;
    const parentId = existing[0].parent_id;

    await pool.execute('UPDATE menus SET parent_id = ? WHERE parent_id = ?', [parentId, id]);

    await pool.execute('DELETE FROM menus WHERE id = ?', [id]);

    await recordAuditLog({
      adminId: req.user?.id,
      adminName: req.user?.name || req.user?.username,
      action: 'DELETE_MENU',
      objectType: 'menu',
      objectId: id,
      details: `Menghapus menu: "${menuTitle}"`,
      ip: req.ip
    });

    res.json({ success: true, message: 'Menu berhasil dihapus.' });
  } catch (error) {
    console.error('deleteMenu error:', error);
    res.status(500).json({ success: false, message: 'Gagal menghapus menu.' });
  }
};

const reorderMenus = async (req, res) => {
  let connection;
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) {
      return res.status(400).json({ success: false, message: 'Format data urutan tidak valid.' });
    }

    connection = await pool.getConnection();
    await connection.beginTransaction();

    for (const item of items) {
      const parentId = item.parent_id && Number(item.parent_id) > 0 ? Number(item.parent_id) : null;
      await connection.query(
        'UPDATE menus SET parent_id = ?, sort_order = ? WHERE id = ?',
        [parentId, Number(item.sort_order) || 0, item.id]
      );
    }

    await connection.commit();

    await recordAuditLog({
      adminId: req.user?.id,
      adminName: req.user?.name || req.user?.username,
      action: 'REORDER_MENUS',
      objectType: 'menu',
      details: `Mengatur ulang struktur urutan & hierarki menu (${items.length} item).`,
      ip: req.ip
    });

    res.json({ success: true, message: 'Urutan menu berhasil diperbarui.' });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error('reorderMenus error:', error);
    res.status(500).json({ success: false, message: 'Gagal mengatur ulang urutan menu.' });
  } finally {
    if (connection) connection.release();
  }
};

const toggleMenuStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['draft', 'published', 'inactive'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Status tidak valid.' });
    }

    await pool.execute('UPDATE menus SET status = ? WHERE id = ?', [status, id]);

    await recordAuditLog({
      adminId: req.user?.id,
      adminName: req.user?.name || req.user?.username,
      action: 'TOGGLE_MENU_STATUS',
      objectType: 'menu',
      objectId: id,
      details: `Mengubah status menu ID ${id} menjadi ${status}`,
      ip: req.ip
    });

    res.json({ success: true, message: `Status menu berhasil diubah menjadi ${status}.` });
  } catch (error) {
    console.error('toggleMenuStatus error:', error);
    res.status(500).json({ success: false, message: 'Gagal mengubah status menu.' });
  }
};

module.exports = {
  getMenus,
  getMenuTree,
  createMenu,
  updateMenu,
  deleteMenu,
  reorderMenus,
  toggleMenuStatus
};
