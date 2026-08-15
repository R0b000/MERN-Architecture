import mongoose from 'mongoose';

export const connectDatabase = async (mongoURI: string): Promise<typeof mongoose> => {
  const conn = await mongoose.connect(mongoURI);
  console.log(`[MongoDB] Connected to ${conn.connection.host}`);
  return conn;
};
