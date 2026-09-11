const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();

// Login admin
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username dan password wajib diisi.'
      });
    }

    // Check user exists
    const [rows] = await pool.execute(
      'SELECT * FROM admins WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Username atau password salah.'
      });
    }

    const admin = rows[0];

    // Verify password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Username atau password salah.'
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    res.json({
      success: true,
      message: 'Login berhasil!',
      data: {
        token,
        admin: {
          id: admin.id,
          username: admin.username,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          avatar: admin.avatar || null
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server.'
    });
  }
};

// Get current admin info
const getMe = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, username, name, email, role, avatar, created_at FROM admins WHERE id = ?',
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Admin tidak ditemukan.'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('GetMe error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server.'
    });
  }
};

// Update profile (username, name, email, avatar)
const updateProfile = async (req, res) => {
  try {
    const { username, name, email, avatar } = req.body;
    const adminId = req.user.id;

    if (!username || !name) {
      return res.status(400).json({
        success: false,
        message: 'Username dan Nama wajib diisi.'
      });
    }

    // Check if username is taken by another admin
    const [existing] = await pool.execute(
      'SELECT id FROM admins WHERE username = ? AND id != ?',
      [username, adminId]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Username sudah digunakan oleh akun lain.'
      });
    }

    // Sanitize avatar to prevent saving temporary blob URLs
    const safeAvatar = (avatar && !avatar.startsWith('blob:')) ? avatar : null;

    // Update profile
    await pool.execute(
      'UPDATE admins SET username = ?, name = ?, email = ?, avatar = ? WHERE id = ?',
      [username, name, email || null, safeAvatar, adminId]
    );

    // Fetch updated admin
    const [rows] = await pool.execute(
      'SELECT id, username, name, email, role, avatar, created_at FROM admins WHERE id = ?',
      [adminId]
    );

    const updatedAdmin = rows[0];

    // Generate refreshed token
    const token = jwt.sign(
      { id: updatedAdmin.id, username: updatedAdmin.username, role: updatedAdmin.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    res.json({
      success: true,
      message: 'Profil akun admin berhasil diperbarui!',
      data: {
        admin: updatedAdmin,
        token
      }
    });
  } catch (error) {
    console.error('UpdateProfile error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat memperbarui profil.'
    });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const adminId = req.user.id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Password saat ini dan password baru wajib diisi.'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password baru minimal 6 karakter.'
      });
    }

    // Verify current password
    const [rows] = await pool.execute(
      'SELECT password FROM admins WHERE id = ?',
      [adminId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Admin tidak ditemukan.'
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, rows[0].password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Password saat ini salah.'
      });
    }

    // Hash and update
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.execute(
      'UPDATE admins SET password = ? WHERE id = ?',
      [hashedPassword, adminId]
    );

    res.json({
      success: true,
      message: 'Password berhasil diubah!'
    });
  } catch (error) {
    console.error('ChangePassword error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat mengubah password.'
    });
  }
};

module.exports = { login, getMe, updateProfile, changePassword };
