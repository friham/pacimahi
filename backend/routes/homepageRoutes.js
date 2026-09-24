const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { checkRole } = require('../middleware/auth');
const { getAllSections, getAllSectionsAdmin, updateSection } = require('../controllers/homepageController');

router.get('/', getAllSections);

router.get('/all', authMiddleware, getAllSectionsAdmin);

router.put(
  '/:sectionKey',
  authMiddleware,
  checkRole(['superadmin', 'admin', 'editor']),
  updateSection
);

module.exports = router;
