const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { checkRole } = require('../middleware/auth');
const {
  getMenus,
  getMenuTree,
  createMenu,
  updateMenu,
  deleteMenu,
  reorderMenus,
  toggleMenuStatus
} = require('../controllers/menuController');

// Public endpoints (only published menus)
router.get('/', (req, res, next) => {
  // For public access, only return published menus
  if (!req.headers.authorization) {
    req.query.status = 'published';
  }
  next();
}, getMenus);
router.get('/tree', getMenuTree);

// Protected endpoints (CMS management)
router.post('/', authMiddleware, checkRole(['superadmin', 'admin']), createMenu);
router.put('/reorder', authMiddleware, checkRole(['superadmin', 'admin']), reorderMenus);
router.put('/:id', authMiddleware, checkRole(['superadmin', 'admin']), updateMenu);
router.patch('/:id/status', authMiddleware, checkRole(['superadmin', 'admin']), toggleMenuStatus);
router.delete('/:id', authMiddleware, checkRole(['superadmin', 'admin']), deleteMenu);

module.exports = router;
