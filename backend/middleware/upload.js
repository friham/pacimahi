const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadImgDir = path.join(__dirname, '..', 'public', 'images', 'uploads');
const uploadDocDir = path.join(__dirname, '..', 'public', 'documents');
[uploadImgDir, uploadDocDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadImgDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});

const imageFilter = (req, file, cb) => {
  
  const allowedExt = /^\.(jpe?g|png|gif|webp)$/i;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExt.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Hanya file gambar (JPEG, JPG, PNG, GIF, WEBP) yang diperbolehkan.'));
  }
};

const documentStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDocDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const baseName = path.basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9-_]/g, '_')
      .substring(0, 50);
    cb(null, `${Date.now()}-${baseName}${ext}`);
  }
});

const documentFilter = (req, file, cb) => {
  const allowedExt = /^\.(pdf|docx?|xlsx?|pptx?|zip|csv|txt|rtf)$/i;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExt.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Format file tidak didukung. Format yang diizinkan: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, ZIP, CSV, TXT.'));
  }
};

const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 20 * 1024 * 1024 } 
});

const uploadDocument = multer({
  storage: documentStorage,
  fileFilter: documentFilter,
  limits: { fileSize: 50 * 1024 * 1024 } 
});

module.exports = { uploadImage, uploadDocument };
