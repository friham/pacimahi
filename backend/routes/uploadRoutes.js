const express = require('express');
const router = express.Router();
const { uploadImage, uploadDocument } = require('../middleware/upload');
const authMiddleware = require('../middleware/auth');
const { uploadImage: uploadImageCtrl, uploadDocument: uploadDocCtrl } = require('../controllers/uploadController');

// Multer upload middleware
const uploadImageMiddleware = uploadImage.single('image');
const uploadDocumentMiddleware = uploadDocument.single('document');

// Protected routes (hanya admin yang login yang bisa upload)
router.post('/', authMiddleware, uploadImageMiddleware, uploadImageCtrl);
router.post('/document', authMiddleware, uploadDocumentMiddleware, uploadDocCtrl);

module.exports = router;
