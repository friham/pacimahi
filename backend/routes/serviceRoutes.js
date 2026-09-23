const express = require('express');
const router = express.Router();
const { 
  getServices, 
  getAllServices, 
  createService, 
  updateService, 
  deleteService 
} = require('../controllers/serviceController');
const authMiddleware = require('../middleware/auth');
const { checkRole } = require('../middleware/auth');

router.get('/', getServices);

router.get('/all', authMiddleware, getAllServices);
router.post('/', authMiddleware, checkRole(['superadmin', 'admin', 'editor']), createService);
router.put('/:id', authMiddleware, checkRole(['superadmin', 'admin', 'editor']), updateService);
router.delete('/:id', authMiddleware, checkRole(['superadmin', 'admin']), deleteService);

module.exports = router;
