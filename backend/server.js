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

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'PA Cimahi API is running',
    timestamp: new Date().toISOString()
  });
});

app.use((err, req, res, _next) => {
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
  // Jangan exit process, hanya log agar server tetap jalan
});

// Tangani uncaught exception agar server tidak crash
process.on('uncaughtException', (err) => {
  console.error('⚠️ Uncaught Exception:', err.message);
  // Jangan exit process, hanya log agar server tetap jalan
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

module.exports = app;
