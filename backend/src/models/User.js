import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Buat schema terlebih dahulu
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username harus diisi'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password harus diisi'],
    minlength: [6, 'Password minimal 6 karakter']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Tambahkan middleware pada schema
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Tambahkan method untuk verifikasi password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Buat model dari schema
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User; 