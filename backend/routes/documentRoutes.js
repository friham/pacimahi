const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { checkRole } = require('../middleware/auth');
const { uploadDocument } = require('../middleware/upload');
const {
  getDocuments,
  createDocument,
  createDocumentByUrl,
  updateDocument,
  deleteDocument
} = require('../controllers/documentController');

const handleDocUpload = (req, res, next) => {
  uploadDocument.single('file')(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });
    next();
  });
};

router.get('/', authMiddleware, getDocuments);

router.post('/', authMiddleware, checkRole(['superadmin', 'admin', 'editor']), handleDocUpload, createDocument);

router.post('/by-url', authMiddleware, checkRole(['superadmin', 'admin', 'editor']), createDocumentByUrl);
router.put('/:id', authMiddleware, checkRole(['superadmin', 'admin', 'editor']), updateDocument);
router.delete('/:id', authMiddleware, checkRole(['superadmin', 'admin']), deleteDocument);

module.exports = router;
