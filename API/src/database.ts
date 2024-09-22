
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToDatabase = async () => {
  const dbUri = process.env.myDataBase;

  if (!dbUri) {
    throw new Error('MY_DATABASE_URL is not defined in .env file');
  }

  try {
    await mongoose.connect(dbUri);
    console.log('Connected to the database successfully!');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

export default connectToDatabase;
