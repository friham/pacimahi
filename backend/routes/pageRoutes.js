const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { checkRole } = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const {
  getPages,
  getPageBySlug,
  getPageById,
  createPage,
  updatePage,
  deletePage,
  togglePageStatus
} = require('../controllers/pageController');

// Optional auth: attach req.user if a valid token is present, but never reject.
const optionalAuth = (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    }
  } catch {
    // Token invalid — treat as unauthenticated, do not abort.
  }
  next();
};

router.get('/slug/:slug', optionalAuth, getPageBySlug);

router.get('/', authMiddleware, getPages);
router.get('/:id', authMiddleware, getPageById);
router.post('/', authMiddleware, checkRole(['superadmin', 'admin', 'editor']), createPage);
router.put('/:id', authMiddleware, checkRole(['superadmin', 'admin', 'editor']), updatePage);
router.patch('/:id/status', authMiddleware, checkRole(['superadmin', 'admin']), togglePageStatus);
router.delete('/:id', authMiddleware, checkRole(['superadmin', 'admin']), deletePage);

module.exports = router;
