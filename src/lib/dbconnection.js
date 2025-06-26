import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.local.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI is not defined in .env.local');
    }
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to the database');
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
    throw err; // Throw error to be handled by caller
  }
};

export default connectDB;