const pool = require('../config/db');
const fs = require('fs');
const path = require('path');
const { recordAuditLog } = require('./auditLogController');

const getDocuments = async (req, res) => {
  try {
    const { search } = req.query;
    let query = 'SELECT * FROM documents WHERE 1=1';
    const params = [];

    if (search) {
      query += ' AND (doc_title LIKE ? OR doc_number LIKE ? OR original_name LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await pool.execute(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('getDocuments error:', error);
    res.status(500).json({ success: false, message: 'Gagal memuat daftar dokumen.' });
  }
};

const createDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'File dokumen wajib diunggah.' });
    }

    const { doc_title, doc_number, doc_date, description } = req.body;

    if (!doc_title) {
      return res.status(400).json({ success: false, message: 'Nama/Judul dokumen wajib diisi.' });
    }

    const fileUrl = `/documents/${req.file.filename}`;

    const [result] = await pool.execute(
      `INSERT INTO documents (file_name, original_name, file_url, mime_type, file_size, doc_title, doc_number, doc_date, description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.file.filename,
        req.file.originalname,
        fileUrl,
        req.file.mimetype,
        req.file.size,
        doc_title,
        doc_number || null,
        doc_date || null,
        description || null
      ]
    );

    await recordAuditLog({
      adminId: req.user?.id,
      adminName: req.user?.name || req.user?.username,
      action: 'UPLOAD_DOCUMENT',
      objectType: 'document',
      objectId: result.insertId,
      details: `Upload dokumen: "${doc_title}" (No: ${doc_number || '-'})`,
      ip: req.ip
    });

    res.status(201).json({
      success: true,
      message: 'Dokumen berhasil diunggah.',
      data: {
        id: result.insertId,
        doc_title,
        doc_number,
        doc_date,
        file_url: fileUrl,
        file_size: req.file.size,
        original_name: req.file.originalname
      }
    });
  } catch (error) {
    console.error('createDocument error:', error);
    res.status(500).json({ success: false, message: 'Gagal mengunggah dokumen.' });
  }
};

const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { doc_title, doc_number, doc_date, description, file_url } = req.body;

    if (!doc_title) {
      return res.status(400).json({ success: false, message: 'Nama dokumen wajib diisi.' });
    }

    if (file_url) {
      await pool.execute(
        `UPDATE documents SET doc_title = ?, doc_number = ?, doc_date = ?, description = ?, file_url = ? WHERE id = ?`,
        [doc_title, doc_number || null, doc_date || null, description || null, file_url, id]
      );
    } else {
      await pool.execute(
        `UPDATE documents SET doc_title = ?, doc_number = ?, doc_date = ?, description = ? WHERE id = ?`,
        [doc_title, doc_number || null, doc_date || null, description || null, id]
      );
    }

    res.json({ success: true, message: 'Informasi dokumen berhasil diperbarui.' });
  } catch (error) {
    console.error('updateDocument error:', error);
    res.status(500).json({ success: false, message: 'Gagal memperbarui dokumen.' });
  }
};

const createDocumentByUrl = async (req, res) => {
  try {
    const { doc_title, doc_number, doc_date, description, file_url } = req.body;

    if (!doc_title) {
      return res.status(400).json({ success: false, message: 'Judul dokumen wajib diisi.' });
    }
    if (!file_url) {
      return res.status(400).json({ success: false, message: 'URL file dokumen wajib diisi.' });
    }

    let parsedUrl;
    try {
      parsedUrl = new URL(file_url);
    } catch {
      return res.status(400).json({ success: false, message: 'Format URL tidak valid.' });
    }
    const ALLOWED_PROTOCOLS = ['http:', 'https:'];
    if (!ALLOWED_PROTOCOLS.includes(parsedUrl.protocol)) {
      return res.status(400).json({
        success: false,
        message: `Protokol URL tidak diizinkan: ${parsedUrl.protocol} Gunakan http:// atau https://.`,
      });
    }

    const [result] = await pool.execute(
      `INSERT INTO documents (file_name, original_name, file_url, mime_type, file_size, doc_title, doc_number, doc_date, description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        file_url.split('/').pop(),
        file_url.split('/').pop(),
        file_url,
        'application/octet-stream',
        0,
        doc_title,
        doc_number || null,
        doc_date || null,
        description || null
      ]
    );

    await recordAuditLog({
      adminId: req.user?.id,
      adminName: req.user?.name || req.user?.username,
      action: 'CREATE_DOCUMENT',
      objectType: 'document',
      objectId: result.insertId,
      details: `Menambahkan dokumen: "${doc_title}" (No: ${doc_number || '-'})`,
      ip: req.ip
    });

    res.status(201).json({
      success: true,
      message: 'Dokumen berhasil ditambahkan.',
      data: { id: result.insertId, doc_title, file_url }
    });
  } catch (error) {
    console.error('createDocumentByUrl error:', error);
    res.status(500).json({ success: false, message: 'Gagal menambahkan dokumen.' });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.execute('SELECT * FROM documents WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Dokumen tidak ditemukan.' });
    }

    const doc = rows[0];

    const filePath = path.join(__dirname, '..', 'public', 'documents', doc.file_name);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error('Could not delete disk file:', err.message);
      }
    }

    await pool.execute('DELETE FROM documents WHERE id = ?', [id]);

    await recordAuditLog({
      adminId: req.user?.id,
      adminName: req.user?.name || req.user?.username,
      action: 'DELETE_DOCUMENT',
      objectType: 'document',
      objectId: id,
      details: `Menghapus dokumen: "${doc.doc_title}"`,
      ip: req.ip
    });

    res.json({ success: true, message: 'Dokumen berhasil dihapus.' });
  } catch (error) {
    console.error('deleteDocument error:', error);
    res.status(500).json({ success: false, message: 'Gagal menghapus dokumen.' });
  }
};

module.exports = {
  getDocuments,
  createDocument,
  createDocumentByUrl,
  updateDocument,
  deleteDocument
};
