const pool = require('../config/db');
const { recordAuditLog } = require('./auditLogController');

const toBool = (val) => {
  if (typeof val === 'boolean') return val;
  if (val === 1 || val === '1' || val === 'true' || val === 'on') return true;
  if (val === 0 || val === '0' || val === 'false' || val === 'off') return false;
  return Boolean(val);
};

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           
    .replace(/[^\w\-]+/g, '')       
    .replace(/\-\-+/g, '-')         
    .replace(/^-+/, '')             
    .replace(/-+$/, '');            
};

const getNews = async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = 'SELECT news.*, admins.name as author_name FROM news LEFT JOIN admins ON news.author_id = admins.id WHERE is_published = TRUE';
    const params = [];

    if (category && category !== 'semua' && category !== 'Semua') {
      query += ' AND news.category = ?';
      params.push(category.toLowerCase());
    }

    if (search && search.trim()) {
      query += ' AND (news.title LIKE ? OR news.content LIKE ?)';
      const term = `%${search.trim()}%`;
      params.push(term, term);
    }

    query += ' ORDER BY published_at DESC';

    const [rows] = await pool.execute(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('GetNews error:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server.' });
  }
};

const getNewsBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const [rows] = await pool.execute(
      'SELECT news.*, admins.name as author_name FROM news LEFT JOIN admins ON news.author_id = admins.id WHERE slug = ? AND is_published = TRUE',
      [slug]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Berita tidak ditemukan.' });
    }

    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('GetNewsBySlug error:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server.' });
  }
};

const getAllNews = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT news.*, admins.name as author_name FROM news LEFT JOIN admins ON news.author_id = admins.id ORDER BY created_at DESC'
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('GetAllNews error:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server.' });
  }
};

const createNews = async (req, res) => {
  try {
    const { title, content, image_url, category } = req.body;
    const is_published = toBool(req.body.is_published);
    const author_id = req.user.id; 

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Judul dan konten wajib diisi.' });
    }

    const slug = `${slugify(title)}-${Date.now()}`;
    const published_at = is_published ? new Date() : null;

    const [result] = await pool.execute(
      'INSERT INTO news (title, slug, content, image_url, category, author_id, is_published, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, slug, content, image_url || '', category || 'berita', author_id, is_published, published_at]
    );

    await recordAuditLog({
      adminId: req.user?.id,
      adminName: req.user?.name || req.user?.username,
      action: 'CREATE_NEWS',
      objectType: 'news',
      objectId: result.insertId,
      details: `Membuat berita: "${title}" (${is_published ? 'dipublikasi' : 'draft'})`,
      ip: req.ip
    });

    res.status(201).json({
      success: true,
      message: 'Berita berhasil ditambahkan.',
      data: { id: result.insertId, title, slug, content, image_url, category, author_id, is_published }
    });
  } catch (error) {
    console.error('CreateNews error:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server.' });
  }
};

const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, image_url, category } = req.body;
    const is_published = toBool(req.body.is_published);

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Judul dan konten wajib diisi.' });
    }

    const [currentRows] = await pool.execute('SELECT is_published, slug FROM news WHERE id = ?', [id]);
    if (currentRows.length === 0) {
      return res.status(404).json({ success: false, message: 'Berita tidak ditemukan.' });
    }

    const current = currentRows[0];
    const newSlug = slugify(title) + '-' + id; 

    let published_at = null;
    if (is_published && !current.is_published) {
      published_at = new Date();
    }

    const [result] = await pool.execute(
      'UPDATE news SET title = ?, slug = ?, content = ?, image_url = ?, category = ?, is_published = ?, published_at = COALESCE(?, published_at) WHERE id = ?',
      [title, newSlug, content, image_url || '', category || 'berita', is_published, published_at, id]
    );

    await recordAuditLog({
      adminId: req.user?.id,
      adminName: req.user?.name || req.user?.username,
      action: 'UPDATE_NEWS',
      objectType: 'news',
      objectId: id,
      details: `Mengubah berita: "${title}"`,
      ip: req.ip
    });

    res.json({ success: true, message: 'Berita berhasil diperbarui.' });
  } catch (error) {
    console.error('UpdateNews error:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server.' });
  }
};

const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.execute('DELETE FROM news WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Berita tidak ditemukan.' });
    }

    await recordAuditLog({
      adminId: req.user?.id,
      adminName: req.user?.name || req.user?.username,
      action: 'DELETE_NEWS',
      objectType: 'news',
      objectId: id,
      details: `Menghapus berita ID ${id}`,
      ip: req.ip
    });

    res.json({ success: true, message: 'Berita berhasil dihapus.' });
  } catch (error) {
    console.error('DeleteNews error:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server.' });
  }
};

module.exports = {
  getNews,
  getNewsBySlug,
  getAllNews,
  createNews,
  updateNews,
  deleteNews
};
