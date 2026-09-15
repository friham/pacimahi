const pool = require('../config/db');

const ALLOWED_SETTINGS_KEYS = [
  // Hero section
  'hero_badge', 'hero_title', 'hero_subtitle', 'running_text',
  // Statistics
  'stat_diterima', 'stat_diputus', 'stat_persentase', 'stat_ikm',
  // Contact info
  'court_address', 'court_phone', 'court_email', 'court_whatsapp',
  // Social media
  'social_facebook', 'social_instagram', 'social_youtube', 'social_whatsapp',
  // Footer
  'footer_description', 'footer_hours_weekday', 'footer_hours_friday',
  // Media
  'video_url', 'video_title', 'video_subtitle',
];

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

    const disallowed = Object.keys(updates).filter(
      (key) => !ALLOWED_SETTINGS_KEYS.includes(key)
    );
    if (disallowed.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Key pengaturan tidak diizinkan: ${disallowed.join(', ')}`,
      });
    }

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
