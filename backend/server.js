const express = require('express');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');
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

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

// ── CORS ──────────────────────────────────────────────
const allowedOrigins = isProduction
  ? (process.env.CORS_ORIGIN || '').split(',').filter(Boolean)
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error('CORS: Origin tidak diizinkan.'));
  },
  credentials: true
}));

// ── Rate Limiting ─────────────────────────────────────
// Public read-only limiter: 300 requests per 15 minutes per IP
// Used for endpoints that multiple frontend components hit simultaneously
// (settings, sliders, services, news, menus tree)
const publicReadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Terlalu banyak request, coba lagi nanti.' }
});

// General API limiter: 100 requests per 15 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Terlalu banyak request, coba lagi nanti.' }
});

// Upload limiter: 20 uploads per 15 minutes per IP
const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Batas upload tercapai, coba lagi nanti.' }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/documents', express.static(path.join(__dirname, 'public/documents')));

// Routes (with rate limiting)
// NOTE: /api/auth does NOT use a global authLimiter anymore.
// The login endpoint has its own loginLimiter inside authRoutes.
// Other auth endpoints (/me, /profile, /password) are authenticated
// and don't need aggressive rate limiting that blocks normal usage.
app.use('/api/auth', authRoutes);
app.use('/api/sliders', publicReadLimiter, sliderRoutes);
app.use('/api/services', publicReadLimiter, serviceRoutes);
app.use('/api/news', publicReadLimiter, newsRoutes);
app.use('/api/settings', publicReadLimiter, settingsRoutes);
app.use('/api/menus', publicReadLimiter, menuRoutes);
app.use('/api/upload', uploadLimiter, uploadRoutes);
app.use('/api/pages', apiLimiter, pageRoutes);
app.use('/api/media', apiLimiter, mediaRoutes);
app.use('/api/documents', apiLimiter, documentRoutes);
app.use('/api/audit-logs', apiLimiter, auditRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'PA Cimahi API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware (Express 5 — do NOT call next(err) after sending response)
app.use((err, req, res, _next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan internal server.'
  });
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
});
