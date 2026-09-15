const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { login, getMe, updateProfile, changePassword } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 5,
  message: {
    success: false,
    message: 'Terlalu banyak percobaan login. Silakan coba lagi dalam 1 menit.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => process.env.NODE_ENV === 'test'
});

router.post('/login', loginLimiter, login);

router.get('/me', authMiddleware, getMe);

router.put('/profile', authMiddleware, updateProfile);

router.put('/password', authMiddleware, changePassword);

module.exports = router;
