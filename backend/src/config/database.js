import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/auth_portal';
    
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
      retryReads: true,
      w: 'majority'
    };

    console.log('Mencoba koneksi ke MongoDB...');
    
    const conn = await mongoose.connect(mongoURI, options);
    
    console.log(`MongoDB terhubung: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error koneksi MongoDB:', error.message);
    
    // Coba reconnect jika gagal
    setTimeout(() => {
      console.log('Mencoba koneksi ulang...');
      connectDB();
    }, 5000);
  }
};

// Handle disconnect events
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB terputus. Mencoba koneksi ulang...');
  setTimeout(connectDB, 5000);
});

export default connectDB;