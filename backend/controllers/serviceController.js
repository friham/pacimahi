const pool = require('../config/db');
const { recordAuditLog } = require('./auditLogController');

const getServices = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM services WHERE is_active = TRUE ORDER BY sort_order ASC'
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('GetServices error:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server.' });
  }
};

const getAllServices = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM services ORDER BY sort_order ASC'
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('GetAllServices error:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server.' });
  }
};

const createService = async (req, res) => {
  try {
    const { name, icon, description, link, sort_order, is_active } = req.body;

    if (!name || !icon) {
      return res.status(400).json({ success: false, message: 'Nama layanan dan Ikon wajib diisi.' });
    }

    const [result] = await pool.execute(
      'INSERT INTO services (name, icon, description, link, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?)',
      [name, icon, description || '', link || '', sort_order || 0, is_active !== undefined ? is_active : true]
    );

    await recordAuditLog({
      adminId: req.user?.id,
      adminName: req.user?.name || req.user?.username,
      action: 'CREATE_SERVICE',
      objectType: 'service',
      objectId: result.insertId,
      details: `Membuat layanan: "${name}"`,
      ip: req.ip
    });

    res.status(201).json({
      success: true,
      message: 'Layanan berhasil ditambahkan.',
      data: { id: result.insertId, name, icon, description, link, sort_order, is_active }
    });
  } catch (error) {
    console.error('CreateService error:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server.' });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, icon, description, link, sort_order, is_active } = req.body;

    if (!name || !icon) {
      return res.status(400).json({ success: false, message: 'Nama layanan dan Ikon wajib diisi.' });
    }

    const [result] = await pool.execute(
      'UPDATE services SET name = ?, icon = ?, description = ?, link = ?, sort_order = ?, is_active = ? WHERE id = ?',
      [name, icon, description || '', link || '', sort_order || 0, is_active, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Layanan tidak ditemukan.' });
    }

    await recordAuditLog({
      adminId: req.user?.id,
      adminName: req.user?.name || req.user?.username,
      action: 'UPDATE_SERVICE',
      objectType: 'service',
      objectId: id,
      details: `Mengubah layanan: "${name}"`,
      ip: req.ip
    });

    res.json({ success: true, message: 'Layanan berhasil diperbarui.' });
  } catch (error) {
    console.error('UpdateService error:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server.' });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.execute('DELETE FROM services WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Layanan tidak ditemukan.' });
    }

    await recordAuditLog({
      adminId: req.user?.id,
      adminName: req.user?.name || req.user?.username,
      action: 'DELETE_SERVICE',
      objectType: 'service',
      objectId: id,
      details: `Menghapus layanan ID ${id}`,
      ip: req.ip
    });

    res.json({ success: true, message: 'Layanan berhasil dihapus.' });
  } catch (error) {
    console.error('DeleteService error:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server.' });
  }
};

module.exports = {
  getServices,
  getAllServices,
  createService,
  updateService,
  deleteService
};
