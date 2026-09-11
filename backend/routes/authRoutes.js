const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { login, getMe, updateProfile, changePassword } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Rate limiter for login: max 5 attempts per minute per IP
const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: {
    success: false,
    message: 'Terlalu banyak percobaan login. Silakan coba lagi dalam 1 menit.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// POST /api/auth/login
router.post('/login', loginLimiter, login);

// GET /api/auth/me (protected)
router.get('/me', authMiddleware, getMe);

// PUT /api/auth/profile (protected)
router.put('/profile', authMiddleware, updateProfile);

// PUT /api/auth/password (protected)
router.put('/password', authMiddleware, changePassword);

module.exports = router;
