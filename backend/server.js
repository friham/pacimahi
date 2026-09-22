const express = require('express');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const sliderRoutes = require('./routes/sliderRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const newsRoutes = require('./routes/newsRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const menuRoutes = require('./routes/menuRoutes');
const pageRoutes = require('./routes/pageRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const documentRoutes = require('./routes/documentRoutes');
const auditRoutes = require('./routes/auditRoutes');
const homepageRoutes = require('./routes/homepageRoutes');
const searchRoutes = require('./routes/searchRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const codeSnippetRoutes = require('./routes/codeSnippetRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(compression());

const allowedOrigins = isProduction
  ? (process.env.CORS_ORIGIN || '').split(',').filter(Boolean)
  : [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174',
      'http://localhost:3000'
    ];

app.use(cors({
  origin: (origin, callback) => {
    
    if (!origin) return callback(null, true);
    if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error('CORS: Origin tidak diizinkan.'));
  },
  credentials: true
}));

const isDevOrLocal = (req) => {
  if (process.env.NODE_ENV !== 'production') return true;
  const ip = req.ip || req.connection?.remoteAddress || '';
  return ip === '127.0.0.1' || ip === '::1' || ip.includes('127.0.0.1');
};

const publicReadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5000,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Terlalu banyak request, coba lagi nanti.' },
  skip: isDevOrLocal
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Terlalu banyak request, coba lagi nanti.' },
  skip: isDevOrLocal
});

const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Batas upload tercapai, coba lagi nanti.' },
  skip: isDevOrLocal
});

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/documents', express.static(path.join(__dirname, 'public/documents')));

app.use('/api/auth', authRoutes);
app.use('/api/sliders', publicReadLimiter, sliderRoutes);
app.use('/api/services', publicReadLimiter, serviceRoutes);
app.use('/api/news', publicReadLimiter, newsRoutes);
app.use('/api/settings', publicReadLimiter, settingsRoutes);
app.use('/api/menus', publicReadLimiter, menuRoutes);
app.use('/api/upload', uploadLimiter, uploadRoutes);
app.use('/api/pages', publicReadLimiter, pageRoutes);
app.use('/api/media', apiLimiter, mediaRoutes);
app.use('/api/documents', apiLimiter, documentRoutes);
app.use('/api/audit-logs', apiLimiter, auditRoutes);
app.use('/api/homepage-sections', publicReadLimiter, homepageRoutes);
app.use('/api/search', publicReadLimiter, searchRoutes);
app.use('/api/analytics', publicReadLimiter, analyticsRoutes);
app.use('/api/code-snippets', apiLimiter, codeSnippetRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'PA Cimahi API is running',
    timestamp: new Date().toISOString()
  });
});

// Handle multer errors (file too large, unexpected field, etc.)
app.use((err, req, res, _next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      success: false,
      message: 'Ukuran file melebihi batas maksimum.'
    });
  }
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({
      success: false,
      message: 'Field file tidak sesuai yang diharapkan server.'
    });
  }
  if (err.code === 'LIMIT_FILE_COUNT') {
    return res.status(400).json({
      success: false,
      message: 'Jumlah file melebihi batas yang diizinkan.'
    });
  }
  if (err.code === 'LIMIT_FIELD_KEY') {
    return res.status(400).json({
      success: false,
      message: 'Nama field terlalu panjang.'
    });
  }
  if (err.name === 'MulterError') {
    return res.status(400).json({
      success: false,
      message: err.message || 'Terjadi kesalahan saat mengunggah file.'
    });
  }

  // General error handler
  console.error('Error:', err.stack);
  if (res.headersSent) return;
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan internal server.'
  });
});

// Tangani unhandled rejection agar server tidak crash
process.on('unhandledRejection', (reason, promise) => {
  console.error('⚠️ Unhandled Rejection di:', promise, 'Alasan:', reason);
  if (isProduction) process.exit(1);
});

// Tangani uncaught exception agar server tidak crash
process.on('uncaughtException', (err) => {
  console.error('⚠️ Uncaught Exception:', err.message);
  if (isProduction) process.exit(1);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

module.exports = app;
