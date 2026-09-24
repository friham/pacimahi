const pool = require('../config/db');
const { recordAuditLog } = require('./auditLogController');

const getSnippets = async (req, res) => {
  try {
    const { lang, search, tag } = req.query;
    let query = `SELECT id, name, description, language, tags, html_code, css_code, js_code, created_at, updated_at FROM code_snippets WHERE 1=1`;
    const params = [];

    if (lang && lang !== 'all') {
      query += ' AND language = ?';
      params.push(lang);
    }
    if (tag) {
      query += ' AND FIND_IN_SET(?, tags)';
      params.push(tag);
    }
    if (search) {
      query += ' AND (name LIKE ? OR description LIKE ? OR tags LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY updated_at DESC';
    const [rows] = await pool.execute(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('getSnippets error:', error);
    res.status(500).json({ success: false, message: 'Gagal mengambil daftar snippet.' });
  }
};

const getSnippetById = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM code_snippets WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Snippet tidak ditemukan.' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('getSnippetById error:', error);
    res.status(500).json({ success: false, message: 'Gagal mengambil snippet.' });
  }
};

const createSnippet = async (req, res) => {
  try {
    const {
      name, description = '', language = 'html',
      tags = '', html_code = '', css_code = '', js_code = ''
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Nama snippet wajib diisi.' });
    }

    const [result] = await pool.execute(
      `INSERT INTO code_snippets (name, description, language, tags, html_code, css_code, js_code)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name.trim(), description, language, tags, html_code, css_code, js_code]
    );

    await recordAuditLog({
      adminId: req.user?.id,
      adminName: req.user?.name || req.user?.username,
      action: 'CREATE',
      objectType: 'code_snippet',
      objectId: result.insertId,
      details: `Snippet "${name}" ditambahkan`,
      ip: req.ip
    });

    res.status(201).json({
      success: true,
      message: 'Snippet berhasil disimpan ke library!',
      data: { id: result.insertId }
    });
  } catch (error) {
    console.error('createSnippet error:', error);
    res.status(500).json({ success: false, message: 'Gagal menyimpan snippet.' });
  }
};

const updateSnippet = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, description, language, tags,
      html_code, css_code, js_code
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Nama snippet wajib diisi.' });
    }

    const [result] = await pool.execute(
      `UPDATE code_snippets SET name=?, description=?, language=?, tags=?, html_code=?, css_code=?, js_code=?
       WHERE id=?`,
      [name.trim(), description || '', language || 'html', tags || '', html_code || '', css_code || '', js_code || '', id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Snippet tidak ditemukan.' });
    }

    await recordAuditLog({
      adminId: req.user?.id,
      adminName: req.user?.name || req.user?.username,
      action: 'UPDATE',
      objectType: 'code_snippet',
      objectId: id,
      details: `Snippet "${name}" diperbarui`,
      ip: req.ip
    });

    res.json({ success: true, message: 'Snippet berhasil diperbarui!' });
  } catch (error) {
    console.error('updateSnippet error:', error);
    res.status(500).json({ success: false, message: 'Gagal memperbarui snippet.' });
  }
};

const deleteSnippet = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute('SELECT name FROM code_snippets WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Snippet tidak ditemukan.' });
    }

    await pool.execute('DELETE FROM code_snippets WHERE id = ?', [id]);
    await recordAuditLog({
      adminId: req.user?.id,
      adminName: req.user?.name || req.user?.username,
      action: 'DELETE',
      objectType: 'code_snippet',
      objectId: id,
      details: `Snippet "${rows[0].name}" dihapus`,
      ip: req.ip
    });

    res.json({ success: true, message: 'Snippet berhasil dihapus dari library.' });
  } catch (error) {
    console.error('deleteSnippet error:', error);
    res.status(500).json({ success: false, message: 'Gagal menghapus snippet.' });
  }
};

module.exports = { getSnippets, getSnippetById, createSnippet, updateSnippet, deleteSnippet };
