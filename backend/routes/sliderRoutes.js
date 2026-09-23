const express = require('express');
const router = express.Router();
const { 
  getSliders, 
  getAllSliders, 
  createSlider, 
  updateSlider, 
  deleteSlider 
} = require('../controllers/sliderController');
const authMiddleware = require('../middleware/auth');
const { checkRole } = require('../middleware/auth');

router.get('/', getSliders);

router.get('/all', authMiddleware, getAllSliders);
router.post('/', authMiddleware, checkRole(['superadmin', 'admin', 'editor']), createSlider);
router.put('/:id', authMiddleware, checkRole(['superadmin', 'admin', 'editor']), updateSlider);
router.delete('/:id', authMiddleware, checkRole(['superadmin', 'admin']), deleteSlider);

module.exports = router;
