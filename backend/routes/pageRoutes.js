const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { checkRole } = require('../middleware/auth');
const {
  getPages,
  getPageBySlug,
  getPageById,
  createPage,
  updatePage,
  deletePage,
  togglePageStatus
} = require('../controllers/pageController');

router.get('/slug/:slug', getPageBySlug);

router.get('/', authMiddleware, getPages);
router.get('/:id', authMiddleware, getPageById);
router.post('/', authMiddleware, checkRole(['superadmin', 'admin', 'editor']), createPage);
router.put('/:id', authMiddleware, checkRole(['superadmin', 'admin', 'editor']), updatePage);
router.patch('/:id/status', authMiddleware, checkRole(['superadmin', 'admin']), togglePageStatus);
router.delete('/:id', authMiddleware, checkRole(['superadmin', 'admin']), deletePage);

module.exports = router;
