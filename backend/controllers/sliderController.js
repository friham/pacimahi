const pool = require('../config/db');
const { recordAuditLog } = require('./auditLogController');

// Get only active sliders (for homepage)
const getSliders = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM sliders WHERE is_active = TRUE ORDER BY sort_order ASC'
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('GetSliders error:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server.' });
  }
};

// Get all sliders (for admin panel)
const getAllSliders = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM sliders ORDER BY sort_order ASC'
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('GetAllSliders error:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server.' });
  }
};

// Create a new slider
const createSlider = async (req, res) => {
  try {
    const { title, image_url, description, link, sort_order, is_active } = req.body;
    
    if (!title || !image_url) {
      return res.status(400).json({ success: false, message: 'Judul dan URL gambar wajib diisi.' });
    }

    const [result] = await pool.execute(
      'INSERT INTO sliders (title, image_url, description, link, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?)',
      [title, image_url, description || '', link || '', sort_order || 0, is_active !== undefined ? is_active : true]
    );

    await recordAuditLog({
      adminId: req.user?.id,
      adminName: req.user?.name || req.user?.username,
      action: 'CREATE_SLIDER',
      objectType: 'slider',
      objectId: result.insertId,
      details: `Membuat slider: "${title}"`,
      ip: req.ip
    });

    res.status(201).json({
      success: true,
      message: 'Slider berhasil ditambahkan.',
      data: { id: result.insertId, title, image_url, description, link, sort_order, is_active }
    });
  } catch (error) {
    console.error('CreateSlider error:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server.' });
  }
};

// Update slider
const updateSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image_url, description, link, sort_order, is_active } = req.body;

    if (!title || !image_url) {
      return res.status(400).json({ success: false, message: 'Judul dan URL gambar wajib diisi.' });
    }

    const [result] = await pool.execute(
      'UPDATE sliders SET title = ?, image_url = ?, description = ?, link = ?, sort_order = ?, is_active = ? WHERE id = ?',
      [title, image_url, description || '', link || '', sort_order || 0, is_active, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Slider tidak ditemukan.' });
    }

    await recordAuditLog({
      adminId: req.user?.id,
      adminName: req.user?.name || req.user?.username,
      action: 'UPDATE_SLIDER',
      objectType: 'slider',
      objectId: id,
      details: `Mengubah slider: "${title}"`,
      ip: req.ip
    });

    res.json({ success: true, message: 'Slider berhasil diperbarui.' });
  } catch (error) {
    console.error('UpdateSlider error:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server.' });
  }
};

// Delete slider
const deleteSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.execute('DELETE FROM sliders WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Slider tidak ditemukan.' });
    }

    await recordAuditLog({
      adminId: req.user?.id,
      adminName: req.user?.name || req.user?.username,
      action: 'DELETE_SLIDER',
      objectType: 'slider',
      objectId: id,
      details: `Menghapus slider ID ${id}`,
      ip: req.ip
    });

    res.json({ success: true, message: 'Slider berhasil dihapus.' });
  } catch (error) {
    console.error('DeleteSlider error:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server.' });
  }
};

module.exports = {
  getSliders,
  getAllSliders,
  createSlider,
  updateSlider,
  deleteSlider
};
