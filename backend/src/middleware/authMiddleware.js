import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    // Cek header authorization
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'Token tidak ditemukan' });
    }

    // Format: "Bearer <token>"
    const token = authHeader.replace('Bearer ', '');
    
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Tambahkan userId ke request object
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    console.error('Error dalam autentikasi:', error);
    res.status(401).json({ message: 'Silakan login terlebih dahulu' });
  }
};

export default auth;