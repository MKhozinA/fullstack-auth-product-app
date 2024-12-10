import express from 'express';
import Product from '../models/Product.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all products
router.get('/', auth, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error dalam mengambil products:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil products' });
  }
});

// Get single product
router.get('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error dalam mengambil product:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil product' });
  }
});

// Create product
router.post('/', auth, async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = new Product({
      name,
      price,
      description
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error dalam membuat product:', error);
    res.status(400).json({ message: 'Terjadi kesalahan saat membuat product' });
  }
});

// Update product
router.put('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error dalam mengupdate product:', error);
    res.status(400).json({ message: 'Terjadi kesalahan saat mengupdate product' });
  }
});

// Delete product
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    res.json({ message: 'Produk berhasil dihapus' });
  } catch (error) {
    console.error('Error dalam menghapus product:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menghapus product' });
  }
});

export default router;