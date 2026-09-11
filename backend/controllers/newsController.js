const pool = require('../config/db');

// Helper to generate URL slug
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start
    .replace(/-+$/, '');            // Trim - from end
};

// Get active/published news (for homepage)
const getNews = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT news.*, admins.name as author_name FROM news LEFT JOIN admins ON news.author_id = admins.id WHERE is_published = TRUE ORDER BY published_at DESC'
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('GetNews error:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server.' });
  }
};

// Get news by slug/id
const getNewsBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const [rows] = await pool.execute(
      'SELECT news.*, admins.name as author_name FROM news LEFT JOIN admins ON news.author_id = admins.id WHERE slug = ?',
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

// Get all news (for admin panel)
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

// Create news
const createNews = async (req, res) => {
  try {
    const { title, content, image_url, category, is_published } = req.body;
    const author_id = req.user.id; // Logged in admin id from auth middleware

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Judul dan konten wajib diisi.' });
    }

    const slug = `${slugify(title)}-${Date.now()}`;
    const published_at = is_published ? new Date() : null;

    const [result] = await pool.execute(
      'INSERT INTO news (title, slug, content, image_url, category, author_id, is_published, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, slug, content, image_url || '', category || 'berita', author_id, is_published !== undefined ? is_published : false, published_at]
    );

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

// Update news
const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, image_url, category, is_published } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Judul dan konten wajib diisi.' });
    }

    // Get current publication status
    const [currentRows] = await pool.execute('SELECT is_published, slug FROM news WHERE id = ?', [id]);
    if (currentRows.length === 0) {
      return res.status(404).json({ success: false, message: 'Berita tidak ditemukan.' });
    }

    const current = currentRows[0];
    const newSlug = slugify(title) + '-' + id; // Keep it clean & unique

    // Only set published_at when publishing for the first time (draft → published)
    let published_at = null;
    if (is_published && !current.is_published) {
      published_at = new Date();
    }

    const [result] = await pool.execute(
      'UPDATE news SET title = ?, slug = ?, content = ?, image_url = ?, category = ?, is_published = ?, published_at = COALESCE(?, published_at) WHERE id = ?',
      [title, newSlug, content, image_url || '', category || 'berita', is_published, published_at, id]
    );

    res.json({ success: true, message: 'Berita berhasil diperbarui.' });
  } catch (error) {
    console.error('UpdateNews error:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server.' });
  }
};

// Delete news
const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.execute('DELETE FROM news WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Berita tidak ditemukan.' });
    }

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
