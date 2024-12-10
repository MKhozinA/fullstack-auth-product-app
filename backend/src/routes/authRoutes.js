import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Cek apakah username sudah ada
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username sudah digunakan' });
    }

    // Buat user baru
    const user = new User({
      username,
      password
    });

    await user.save();
    res.status(201).json({ message: 'Registrasi berhasil' });
  } catch (error) {
    console.error('Error dalam registrasi:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat registrasi' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Cari user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Username atau password salah' });
    }

    // Verifikasi password
    const validPassword = await user.comparePassword(password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Username atau password salah' });
    }

    // Buat token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Error dalam login:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat login' });
  }
});

// Get profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error dalam mengambil profile:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil profile' });
  }
});

export default router;