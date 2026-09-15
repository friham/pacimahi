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

router.get('/', getServices);

router.get('/all', authMiddleware, getAllServices);
router.post('/', authMiddleware, createService);
router.put('/:id', authMiddleware, updateService);
router.delete('/:id', authMiddleware, deleteService);

module.exports = router;
