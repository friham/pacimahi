const pool = require('../config/db');
const fs = require('fs');
const path = require('path');
const { recordAuditLog } = require('./auditLogController');

const getMedia = async (req, res) => {
  try {
    const { type, search } = req.query;
    let query = 'SELECT * FROM media WHERE 1=1';
    const params = [];

    if (type === 'image') {
      query += " AND (mime_type LIKE 'image/%')";
    } else if (type === 'video') {
      query += " AND (mime_type LIKE 'video/%')";
    }

    if (search) {
      query += ' AND (original_name LIKE ? OR alt_text LIKE ? OR caption LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await pool.execute(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('getMedia error:', error);
    res.status(500).json({ success: false, message: 'Gagal memuat media library.' });
  }
};

const createMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Tidak ada file yang diunggah.' });
    }

    const { alt_text, caption } = req.body;
    const fileUrl = `/images/uploads/${req.file.filename}`;

    const [result] = await pool.execute(
      `INSERT INTO media (file_name, original_name, file_url, mime_type, file_size, alt_text, caption)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        req.file.filename,
        req.file.originalname,
        fileUrl,
        req.file.mimetype,
        req.file.size,
        alt_text || req.file.originalname,
        caption || null
      ]
    );

    await recordAuditLog({
      adminId: req.user?.id,
      adminName: req.user?.name || req.user?.username,
      action: 'UPLOAD_MEDIA',
      objectType: 'media',
      objectId: result.insertId,
      details: `Upload media: "${req.file.originalname}" (${(req.file.size / 1024).toFixed(1)} KB)`,
      ip: req.ip
    });

    res.status(201).json({
      success: true,
      message: 'File berhasil diunggah ke Media Library.',
      data: {
        id: result.insertId,
        file_name: req.file.filename,
        original_name: req.file.originalname,
        file_url: fileUrl,
        mime_type: req.file.mimetype,
        file_size: req.file.size,
        alt_text: alt_text || req.file.originalname,
        caption: caption || ''
      }
    });
  } catch (error) {
    console.error('createMedia error:', error);
    res.status(500).json({ success: false, message: 'Gagal mengunggah media.' });
  }
};

const updateMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const { alt_text, caption } = req.body;

    const [existing] = await pool.execute('SELECT * FROM media WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Media tidak ditemukan.' });
    }

    await pool.execute(
      'UPDATE media SET alt_text = ?, caption = ? WHERE id = ?',
      [alt_text || null, caption || null, id]
    );

    res.json({ success: true, message: 'Informasi media berhasil diperbarui.' });
  } catch (error) {
    console.error('updateMedia error:', error);
    res.status(500).json({ success: false, message: 'Gagal memperbarui info media.' });
  }
};

const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.execute('SELECT * FROM media WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Media tidak ditemukan.' });
    }

    const item = rows[0];

    const filePath = path.join(__dirname, '..', 'public', 'images', 'uploads', item.file_name);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error('Could not delete disk file:', err.message);
      }
    }

    await pool.execute('DELETE FROM media WHERE id = ?', [id]);

    await recordAuditLog({
      adminId: req.user?.id,
      adminName: req.user?.name || req.user?.username,
      action: 'DELETE_MEDIA',
      objectType: 'media',
      objectId: id,
      details: `Menghapus media: "${item.original_name}"`,
      ip: req.ip
    });

    res.json({ success: true, message: 'Media berhasil dihapus.' });
  } catch (error) {
    console.error('deleteMedia error:', error);
    res.status(500).json({ success: false, message: 'Gagal menghapus media.' });
  }
};

module.exports = {
  getMedia,
  createMedia,
  updateMedia,
  deleteMedia
};
