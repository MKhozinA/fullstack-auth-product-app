import mongoose from 'mongoose';

// Cek apakah model sudah ada
const Product = mongoose.models.Product || mongoose.model('Product', new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nama produk harus diisi'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Harga produk harus diisi'],
    min: [0, 'Harga tidak boleh negatif']
  },
  description: {
    type: String,
    required: [true, 'Deskripsi produk harus diisi'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
}));

export default Product;