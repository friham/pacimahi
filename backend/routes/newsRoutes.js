const express = require('express');
const router = express.Router();
const { 
  getNews, 
  getNewsBySlug, 
  getAllNews, 
  createNews, 
  updateNews, 
  deleteNews 
} = require('../controllers/newsController');
const authMiddleware = require('../middleware/auth');

router.get('/', getNews);

router.get('/admin/all', authMiddleware, getAllNews);

router.get('/:slug', getNewsBySlug);
router.post('/', authMiddleware, createNews);
router.put('/:id', authMiddleware, updateNews);
router.delete('/:id', authMiddleware, deleteNews);

module.exports = router;
