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

// Public routes
router.get('/', getNews);

// Protected routes (admin panel)
// NOTE: /admin/all MUST come before /:slug, otherwise :slug captures 'admin'
router.get('/admin/all', authMiddleware, getAllNews);

router.get('/:slug', getNewsBySlug);
router.post('/', authMiddleware, createNews);
router.put('/:id', authMiddleware, updateNews);
router.delete('/:id', authMiddleware, deleteNews);

module.exports = router;
