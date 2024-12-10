import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/database.js';

// Import routes
import authRoutes from './src/routes/authRoutes.js';
import productRoutes from './src/routes/productRoutes.js';

// Konfigurasi dotenv
dotenv.config({ path: './src/config/.env' });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Selamat datang di API Auth dan Product' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Terjadi kesalahan pada server!' });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route tidak ditemukan!' });
});

const PORT = process.env.PORT || 5000;

// Connect ke database sebelum menjalankan server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server berjalan di port ${PORT}`);
    });
  } catch (error) {
    console.error('Gagal menjalankan server:', error);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Tutup server & keluar dari proses
  process.exit(1);
});