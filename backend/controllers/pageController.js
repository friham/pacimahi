const pool = require('../config/db');
const { recordAuditLog } = require('./auditLogController');

const getPages = async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = `
      SELECT p.*, m.title as menu_title, a.name as author_name 
      FROM pages p
      LEFT JOIN menus m ON p.menu_id = m.id
      LEFT JOIN admins a ON p.author_id = a.id
      WHERE 1=1
    `;
    const params = [];

    if (status && status !== 'all') {
      query += ' AND p.status = ?';
      params.push(status);
    }
    if (search) {
      query += ' AND (p.title LIKE ? OR p.slug LIKE ? OR p.excerpt LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY p.updated_at DESC';

    const [rows] = await pool.execute(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('getPages error:', error);
    res.status(500).json({ success: false, message: 'Gagal mengambil daftar halaman.' });
  }
};

const getPageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const isPreview = req.query.preview === 'true';

    let query = `
      SELECT p.*, m.title as menu_title, m.parent_id as menu_parent_id, a.name as author_name
      FROM pages p
      LEFT JOIN menus m ON p.menu_id = m.id
      LEFT JOIN admins a ON p.author_id = a.id
      WHERE p.slug = ?
    `;
    const params = [slug];

    if (!isPreview) {
      query += " AND p.status = 'published'";
    }

    const [rows] = await pool.execute(query, params);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Halaman tidak ditemukan atau belum dipublikasikan.'
      });
    }

    const page = rows[0];

    const [blocks] = await pool.execute(
      `SELECT * FROM content_blocks WHERE page_id = ? ORDER BY sort_order ASC, id ASC`,
      [page.id]
    );

    const parsedBlocks = blocks.map(b => ({
      ...b,
      content: (() => {
        try { return JSON.parse(b.content); } catch { return b.content; }
      })(),
      settings: (() => {
        try { return JSON.parse(b.settings); } catch { return {}; }
      })()
    }));

    res.json({
      success: true,
      data: {
        ...page,
        blocks: parsedBlocks
      }
    });
  } catch (error) {
    console.error('getPageBySlug error:', error);
    res.status(500).json({ success: false, message: 'Gagal memuat konten halaman.' });
  }
};

const getPageById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.execute(
      `SELECT p.*, m.title as menu_title FROM pages p LEFT JOIN menus m ON p.menu_id = m.id WHERE p.id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Halaman tidak ditemukan.' });
    }

    const page = rows[0];

    const [blocks] = await pool.execute(
      `SELECT * FROM content_blocks WHERE page_id = ? ORDER BY sort_order ASC, id ASC`,
      [id]
    );

    const parsedBlocks = blocks.map(b => ({
      ...b,
      content: (() => {
        try { return JSON.parse(b.content); } catch { return b.content; }
      })(),
      settings: (() => {
        try { return JSON.parse(b.settings); } catch { return {}; }
      })()
    }));

    res.json({
      success: true,
      data: {
        ...page,
        blocks: parsedBlocks
      }
    });
  } catch (error) {
    console.error('getPageById error:', error);
    res.status(500).json({ success: false, message: 'Gagal mengambil detail halaman.' });
  }
};

const createPage = async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const {
      title,
      subtitle,
      slug,
      excerpt,
      content_html,
      status = 'draft',
      seo_title,
      meta_description,
      meta_keywords,
      og_title,
      og_description,
      og_image,
      menu_id,
      blocks = []
    } = req.body;

    if (!title || !slug) {
      return res.status(400).json({ success: false, message: 'Judul dan slug halaman wajib diisi.' });
    }

    const [checkSlug] = await connection.query('SELECT id FROM pages WHERE slug = ?', [slug]);
    if (checkSlug.length > 0) {
      return res.status(400).json({ success: false, message: 'Slug halaman sudah digunakan, gunakan slug lain.' });
    }

    await connection.beginTransaction();

    const authorId = req.user?.id || null;
    const cleanMenuId = menu_id && Number(menu_id) > 0 ? Number(menu_id) : null;

    const [pageRes] = await connection.query(
      `INSERT INTO pages (
        title, subtitle, slug, excerpt, content_html, status,
        seo_title, meta_description, meta_keywords, og_title, og_description, og_image,
        menu_id, author_id, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        title,
        subtitle || null,
        slug,
        excerpt || null,
        content_html || null,
        status,
        seo_title || title,
        meta_description || excerpt || null,
        meta_keywords || null,
        og_title || title,
        og_description || meta_description || null,
        og_image || null,
        cleanMenuId,
        authorId
      ]
    );

    const newPageId = pageRes.insertId;

    if (Array.isArray(blocks) && blocks.length > 0) {
      for (let i = 0; i < blocks.length; i++) {
        const b = blocks[i];
        const contentStr = typeof b.content === 'object' ? JSON.stringify(b.content) : String(b.content || '');
        const settingsStr = typeof b.settings === 'object' ? JSON.stringify(b.settings) : '{}';

        await connection.query(
          `INSERT INTO content_blocks (page_id, type, content, settings, sort_order)
           VALUES (?, ?, ?, ?, ?)`,
          [newPageId, b.type, contentStr, settingsStr, b.sort_order ?? (i + 1)]
        );
      }
    }

    await connection.commit();

    await recordAuditLog({
      adminId: req.user?.id,
      adminName: req.user?.name || req.user?.username,
      action: 'CREATE_PAGE',
      objectType: 'page',
      objectId: newPageId,
      details: `Membuat halaman baru: "${title}" (Status: ${status})`,
      ip: req.ip
    });

    res.status(201).json({
      success: true,
      message: 'Halaman berhasil dibuat.',
      data: { id: newPageId, slug }
    });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error('createPage error:', error);
    res.status(500).json({ success: false, message: 'Gagal membuat halaman.' });
  } finally {
    if (connection) connection.release();
  }
};

const updatePage = async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const { id } = req.params;
    const {
      title,
      subtitle,
      slug,
      excerpt,
      content_html,
      status,
      seo_title,
      meta_description,
      meta_keywords,
      og_title,
      og_description,
      og_image,
      menu_id,
      blocks
    } = req.body;

    if (!title || !slug) {
      return res.status(400).json({ success: false, message: 'Judul dan slug halaman wajib diisi.' });
    }

    const [checkSlug] = await connection.query('SELECT id FROM pages WHERE slug = ? AND id != ?', [slug, id]);
    if (checkSlug.length > 0) {
      return res.status(400).json({ success: false, message: 'Slug halaman sudah digunakan oleh halaman lain.' });
    }

    await connection.beginTransaction();

    const cleanMenuId = menu_id && Number(menu_id) > 0 ? Number(menu_id) : null;

    await connection.query(
      `UPDATE pages SET 
        title = ?, 
        subtitle = ?, 
        slug = ?, 
        excerpt = ?, 
        content_html = ?, 
        status = ?, 
        seo_title = ?, 
        meta_description = ?, 
        meta_keywords = ?, 
        og_title = ?, 
        og_description = ?, 
        og_image = ?, 
        menu_id = ?,
        updated_at = NOW()
       WHERE id = ?`,
      [
        title,
        subtitle || null,
        slug,
        excerpt || null,
        content_html || null,
        status || 'draft',
        seo_title || null,
        meta_description || null,
        meta_keywords || null,
        og_title || null,
        og_description || null,
        og_image || null,
        cleanMenuId,
        id
      ]
    );

    if (Array.isArray(blocks)) {
      await connection.query('DELETE FROM content_blocks WHERE page_id = ?', [id]);

      for (let i = 0; i < blocks.length; i++) {
        const b = blocks[i];
        const contentStr = typeof b.content === 'object' ? JSON.stringify(b.content) : String(b.content || '');
        const settingsStr = typeof b.settings === 'object' ? JSON.stringify(b.settings) : '{}';

        await connection.query(
          `INSERT INTO content_blocks (page_id, type, content, settings, sort_order)
           VALUES (?, ?, ?, ?, ?)`,
          [id, b.type, contentStr, settingsStr, b.sort_order ?? (i + 1)]
        );
      }
    }

    await connection.commit();

    await recordAuditLog({
      adminId: req.user?.id,
      adminName: req.user?.name || req.user?.username,
      action: 'UPDATE_PAGE',
      objectType: 'page',
      objectId: id,
      details: `Mengubah halaman: "${title}" (Status: ${status})`,
      ip: req.ip
    });

    res.json({ success: true, message: 'Halaman berhasil diperbarui.' });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error('updatePage error:', error);
    res.status(500).json({ success: false, message: 'Gagal memperbarui halaman.' });
  } finally {
    if (connection) connection.release();
  }
};

const deletePage = async (req, res) => {
  try {
    const { id } = req.params;

    const [existing] = await pool.execute('SELECT title FROM pages WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Halaman tidak ditemukan.' });
    }

    const pageTitle = existing[0].title;

    await pool.execute('DELETE FROM content_blocks WHERE page_id = ?', [id]);

    await pool.execute('DELETE FROM pages WHERE id = ?', [id]);

    await recordAuditLog({
      adminId: req.user?.id,
      adminName: req.user?.name || req.user?.username,
      action: 'DELETE_PAGE',
      objectType: 'page',
      objectId: id,
      details: `Menghapus halaman: "${pageTitle}"`,
      ip: req.ip
    });

    res.json({ success: true, message: 'Halaman berhasil dihapus.' });
  } catch (error) {
    console.error('deletePage error:', error);
    res.status(500).json({ success: false, message: 'Gagal menghapus halaman.' });
  }
};

const togglePageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['draft', 'published', 'archived'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Status halaman tidak valid.' });
    }

    await pool.execute('UPDATE pages SET status = ?, updated_at = NOW() WHERE id = ?', [status, id]);

    await recordAuditLog({
      adminId: req.user?.id,
      adminName: req.user?.name || req.user?.username,
      action: status === 'published' ? 'PUBLISH_PAGE' : 'UNPUBLISH_PAGE',
      objectType: 'page',
      objectId: id,
      details: `Mengubah status halaman ID ${id} menjadi ${status}`,
      ip: req.ip
    });

    res.json({ success: true, message: `Status halaman berhasil diubah menjadi ${status}.` });
  } catch (error) {
    console.error('togglePageStatus error:', error);
    res.status(500).json({ success: false, message: 'Gagal mengubah status halaman.' });
  }
};

module.exports = {
  getPages,
  getPageBySlug,
  getPageById,
  createPage,
  updatePage,
  deletePage,
  togglePageStatus
};
