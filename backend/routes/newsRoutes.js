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
const { checkRole } = require('../middleware/auth');

router.get('/', getNews);

router.get('/admin/all', authMiddleware, getAllNews);

router.get('/:slug', getNewsBySlug);
router.post('/', authMiddleware, checkRole(['superadmin', 'admin', 'editor']), createNews);
router.put('/:id', authMiddleware, checkRole(['superadmin', 'admin', 'editor']), updateNews);
router.delete('/:id', authMiddleware, checkRole(['superadmin', 'admin']), deleteNews);

module.exports = router;
