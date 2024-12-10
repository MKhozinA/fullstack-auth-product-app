const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const { nama, deskripsi, harga } = req.body;
    const product = new Product({
      nama,
      deskripsi,
      harga,
      userId: req.userId
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.userId });
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ 
      _id: req.params.id,
      userId: req.userId 
    });
    if (!product) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });
    if (!product) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }
    res.json({ message: 'Produk berhasil dihapus' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; 