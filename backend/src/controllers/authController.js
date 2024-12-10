const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { nama, email, password, jenisKelamin } = req.body;
    const user = new User({ nama, email, password, jenisKelamin });
    await user.save();
    res.status(201).json({ message: 'Registrasi berhasil' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Email tidak ditemukan');
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Password salah');
    }

    const token = jwt.sign({ userId: user._id }, 'secret_key');
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; 