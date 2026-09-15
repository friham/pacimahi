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
  const allowedMime = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExt.test(ext) && allowedMime.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Hanya file gambar (JPEG, JPG, PNG, GIF, WEBP) yang diperbolehkan. Pastikan format file dan MIME type sesuai.'));
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

const allowedDocumentMimes = {
  '.pdf': ['application/pdf'],
  '.doc': ['application/msword'],
  '.docx': ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'],
  '.xls': ['application/vnd.ms-excel'],
  '.xlsx': ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  '.ppt': ['application/vnd.ms-powerpoint'],
  '.pptx': ['application/vnd.openxmlformats-officedocument.presentationml.presentation'],
  '.zip': ['application/zip', 'application/x-zip-compressed'],
  '.csv': ['text/csv', 'application/vnd.ms-excel', 'text/plain'],
  '.txt': ['text/plain'],
  '.rtf': ['application/rtf', 'text/rtf'],
};

// .docx and .zip often get reported as application/octet-stream by certain
// OS/browser combinations (e.g. Windows Edge, some Linux DE file managers).
// We allow it ONLY when the extension is already verified to be .docx or .zip.
const octetStreamTolerantExts = new Set(['.docx', '.zip']);

const documentFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const mimeWhitelist = allowedDocumentMimes[ext];

  if (!mimeWhitelist) {
    return cb(new Error('Format file tidak didukung. Pastikan format file dan MIME type sesuai.'));
  }

  const isWhitelistedMime = mimeWhitelist.includes(file.mimetype);
  const isOctetStreamTolerated =
    file.mimetype === 'application/octet-stream' && octetStreamTolerantExts.has(ext);

  if (isWhitelistedMime || isOctetStreamTolerated) {
    cb(null, true);
  } else {
    cb(new Error('Format file tidak didukung. Pastikan format file dan MIME type sesuai.'));
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
