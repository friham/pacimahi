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

router.get('/', getSliders);

router.get('/all', authMiddleware, getAllSliders);
router.post('/', authMiddleware, createSlider);
router.put('/:id', authMiddleware, updateSlider);
router.delete('/:id', authMiddleware, deleteSlider);

module.exports = router;
