const pool = require('../config/db');

const recordAuditLog = async ({ adminId = null, adminName = 'Sistem', action, objectType, objectId = null, details = '', ip = '' }) => {
  try {
    await pool.execute(
      `INSERT INTO audit_logs (admin_id, admin_name, action, object_type, object_id, details, ip_address)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [adminId, adminName, action, objectType, String(objectId || ''), details, ip]
    );
  } catch (error) {
    console.error('Failed to write audit log:', error.message);
  }
};

const getAuditLogs = async (req, res) => {
  try {
    const parsedLimit = parseInt(req.query.limit, 10);
    const parsedPage = parseInt(req.query.page, 10);
    const limit = Number.isNaN(parsedLimit) || parsedLimit < 1 ? 50 : parsedLimit;
    const page = Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
    const offset = (page - 1) * limit;

    const [rows] = await pool.execute(
      `SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    const [countResult] = await pool.query('SELECT COUNT(*) as total FROM audit_logs');
    const total = countResult[0].total;

    res.json({
      success: true,
      data: rows,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('getAuditLogs error:', error);
    res.status(500).json({ success: false, message: 'Gagal mengambil data audit log.' });
  }
};

module.exports = {
  recordAuditLog,
  getAuditLogs
};
