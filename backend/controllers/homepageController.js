const pool = require('../config/db');
const { recordAuditLog } = require('./auditLogController');

const ALLOWED_FIELDS = [
  'badge_text', 'title', 'description', 'image_url', 'link_url', 'link_text', 'items', 'status'
];

const SECTION_KEY_PATTERN = /^[a-z0-9_]{2,50}$/;

const isPlainObject = (v) => typeof v === 'object' && v !== null && !Array.isArray(v);

const validateItems = (items) => {
  if (items === undefined || items === null) return null;
  if (typeof items === 'string') {
    const trimmed = items.trim();
    if (trimmed === '') return null;
    try {
      items = JSON.parse(trimmed);
    } catch (e) {
      throw new Error('Field items harus JSON yang valid (array/objek) atau string JSON ter-parse.');
    }
  }
  if (!Array.isArray(items) && !isPlainObject(items)) {
    throw new Error('Field items harus berupa array atau objek JSON yang valid.');
  }
  return items;
};

/**
 * Public: GET /api/homepage-sections
 * Mengembalikan semua section berstatus published (urut berdasarkan id).
 * Kolom items (JSON) dipastikan sudah berupa array/objek, bukan string.
 */
const parseItems = (row) => {
  if (typeof row.items === 'string') {
    try {
      row.items = JSON.parse(row.items);
    } catch (e) {
      row.items = null;
    }
  }
  return row;
};

const getAllSections = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM homepage_sections WHERE status = ? ORDER BY id ASC',
      ['published']
    );
    res.json({ success: true, data: rows.map(parseItems) });
  } catch (error) {
    console.error('GetAllHomepageSections error:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server.' });
  }
};

/**
 * Admin only: GET /api/homepage-sections/all
 * Semua section termasuk draft (dengan auth). Konvensi sama dengan
 * sliders/services/news: endpoint /all untuk kebutuhan panel admin,
 * supaya section berstatus draft tetap terlihat dan bisa dipublish ulang.
 */
const getAllSectionsAdmin = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM homepage_sections ORDER BY id ASC'
    );
    res.json({ success: true, data: rows.map(parseItems) });
  } catch (error) {
    console.error('GetAllHomepageSectionsAdmin error:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server.' });
  }
};

/**
 * Admin only: PUT /api/homepage-sections/:sectionKey
 * Terima badge_text/title/description/image_url/link_url/link_text/items/status.
 * items harus JSON valid (objek JS, string JSON ter-parse, atau null).
 */
const updateSection = async (req, res) => {
  try {
    const { sectionKey } = req.params;

    if (!sectionKey || !SECTION_KEY_PATTERN.test(sectionKey)) {
      return res.status(400).json({
        success: false,
        message: 'Format section key tidak valid (huruf kecil, angka, underscore).'
      });
    }

    const unknownKeys = Object.keys(req.body || {}).filter(
      (key) => !ALLOWED_FIELDS.includes(key)
    );
    if (unknownKeys.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Field tidak diizinkan: ${unknownKeys.join(', ')}`
      });
    }

    const updates = {};
    for (const field of ['badge_text', 'title', 'description', 'image_url', 'link_url', 'link_text']) {
      if (req.body[field] !== undefined) {
        if (req.body[field] !== null && typeof req.body[field] !== 'string') {
          return res.status(400).json({
            success: false,
            message: `Field ${field} harus berupa string atau null.`
          });
        }
        updates[field] = req.body[field];
      }
    }

    if (req.body.status !== undefined) {
      if (!['published', 'draft'].includes(req.body.status)) {
        return res.status(400).json({
          success: false,
          message: 'Field status harus bernilai published atau draft.'
        });
      }
      updates.status = req.body.status;
    }

    if (req.body.items !== undefined) {
      try {
        updates.items = validateItems(req.body.items);
      } catch (e) {
        return res.status(400).json({ success: false, message: e.message });
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Tidak ada field valid untuk diperbarui.'
      });
    }

    const setClause = Object.keys(updates).map((f) => `${f} = ?`).join(', ');
    const values = Object.values(updates);

    const [result] = await pool.execute(
      `UPDATE homepage_sections SET ${setClause} WHERE section_key = ?`,
      [...values, sectionKey]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Section tidak ditemukan.' });
    }

    await recordAuditLog({
      adminId: req.user?.id,
      adminName: req.user?.name || req.user?.username,
      action: 'UPDATE_HOMEPAGE_SECTION',
      objectType: 'homepage_section',
      objectId: sectionKey,
      details: `Mengubah section homepage: "${sectionKey}" (field: ${Object.keys(updates).join(', ')})`,
      ip: req.ip
    });

    res.json({ success: true, message: 'Section homepage berhasil diperbarui.' });
  } catch (error) {
    console.error('UpdateHomepageSection error:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server.' });
  }
};

module.exports = { getAllSections, getAllSectionsAdmin, updateSection };
