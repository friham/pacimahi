const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { checkRole, optionalAuth } = require('../middleware/auth');
const {
  getMenus,
  getMenuTree,
  createMenu,
  updateMenu,
  deleteMenu,
  reorderMenus,
  toggleMenuStatus
} = require('../controllers/menuController');

router.get('/', optionalAuth, getMenus);
router.get('/tree', optionalAuth, getMenuTree);

router.post('/', authMiddleware, checkRole(['superadmin', 'admin']), createMenu);

router.put('/reorder', authMiddleware, checkRole(['superadmin', 'admin']), reorderMenus);
router.put('/:id', authMiddleware, checkRole(['superadmin', 'admin']), updateMenu);
router.patch('/:id/status', authMiddleware, checkRole(['superadmin', 'admin']), toggleMenuStatus);
router.delete('/:id', authMiddleware, checkRole(['superadmin', 'admin']), deleteMenu);

module.exports = router;
