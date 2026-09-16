const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { checkRole } = require('../middleware/auth');
const { getAllSections, getAllSectionsAdmin, updateSection } = require('../controllers/homepageController');

// Public: semua section berstatus published
router.get('/', getAllSections);

// Admin only: semua section termasuk draft
router.get('/all', authMiddleware, getAllSectionsAdmin);

// Admin only: update section by section_key
router.put(
  '/:sectionKey',
  authMiddleware,
  checkRole(['superadmin', 'admin', 'editor']),
  updateSection
);

module.exports = router;
