const pool = require('../config/db');

const getSettings = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT setting_key, setting_value, setting_group FROM site_settings');
    const settings = {};
    rows.forEach(r => {
      settings[r.setting_key] = r.setting_value;
    });

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('GetSettings error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat mengambil pengaturan.'
    });
  }
};

const updateSettings = async (req, res) => {
  try {
    const updates = req.body; 

    for (const [key, value] of Object.entries(updates)) {
      const valStr = value !== null && value !== undefined ? String(value) : '';
      await pool.execute(
        `INSERT INTO site_settings (setting_key, setting_value) 
         VALUES (?, ?) 
         ON DUPLICATE KEY UPDATE setting_value = ?`,
        [key, valStr, valStr]
      );
    }

    res.json({
      success: true,
      message: 'Pengaturan website berhasil diperbarui dan disinkronkan!'
    });
  } catch (error) {
    console.error('UpdateSettings error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat menyimpan pengaturan.'
    });
  }
};

module.exports = { getSettings, updateSettings };
