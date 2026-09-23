const express = require('express');
const router = express.Router();
const { uploadImage, uploadDocument } = require('../middleware/upload');
const authMiddleware = require('../middleware/auth');
const { checkRole } = require('../middleware/auth');
const { uploadImage: uploadImageCtrl, uploadDocument: uploadDocCtrl } = require('../controllers/uploadController');

const uploadImageMiddleware = uploadImage.single('image');
const uploadDocumentMiddleware = uploadDocument.single('document');

router.post('/', authMiddleware, checkRole(['superadmin', 'admin', 'editor']), uploadImageMiddleware, uploadImageCtrl);
router.post('/document', authMiddleware, checkRole(['superadmin', 'admin', 'editor']), uploadDocumentMiddleware, uploadDocCtrl);

module.exports = router;
