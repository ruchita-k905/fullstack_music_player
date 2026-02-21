import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '..//env' });

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected Successfully`);
  } catch (error) {
    console.error('MongoDB Connection error:', error.message);
  }
};
export default connectDB;
