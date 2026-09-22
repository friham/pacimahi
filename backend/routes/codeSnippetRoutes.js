const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { checkRole } = require('../middleware/auth');
const {
  getSnippets,
  getSnippetById,
  createSnippet,
  updateSnippet,
  deleteSnippet
} = require('../controllers/codeSnippetController');

// Public read (for use in frontend CMS)
router.get('/', getSnippets);
router.get('/:id', getSnippetById);

// Admin protected
router.post('/', authMiddleware, checkRole(['superadmin', 'admin', 'editor']), createSnippet);
router.put('/:id', authMiddleware, checkRole(['superadmin', 'admin', 'editor']), updateSnippet);
router.delete('/:id', authMiddleware, checkRole(['superadmin', 'admin']), deleteSnippet);

module.exports = router;
