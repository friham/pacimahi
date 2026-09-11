const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: 'Akses ditolak. Token tidak ditemukan.' 
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Token tidak valid atau sudah kadaluarsa.' 
    });
  }
};

const checkRole = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Tidak terautentikasi.' });
    }
    const roleList = Array.isArray(roles) ? roles : [roles];
    if (roleList.length > 0 && !roleList.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Akses ditolak. Anda tidak memiliki izin untuk melakukan tindakan ini.'
      });
    }
    next();
  };
};

authMiddleware.authMiddleware = authMiddleware;
authMiddleware.checkRole = checkRole;
module.exports = authMiddleware;
module.exports.checkRole = checkRole;
