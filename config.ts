import mongoose from 'mongoose';
import Redis from 'ioredis';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  MONGODB_URI: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD?: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  NODE_ENV: string;
  PORT: number;
}

const config: IConfig = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce',
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: parseInt(process.env.REDIS_PORT || '6379', 10),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5000', 10),
};

// MongoDB Connection
let mongoConnection: typeof mongoose | null = null;

export const connectMongoDB = async (): Promise<typeof mongoose> => {
  if (mongoConnection) {
    console.log('✅ MongoDB already connected');
    return mongoConnection;
  }

  try {
    const conn = await mongoose.connect(config.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    mongoConnection = conn;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB Connection Error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB Disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔒 MongoDB connection closed due to app termination');
      process.exit(0);
    });

    return conn;
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error);
    throw error;
  }
};

// Redis Connection
let redisClient: Redis | null = null;

export const getRedisClient = (): Redis => {
  if (redisClient) {
    return redisClient;
  }

  const redisOptions: Redis.RedisOptions = {
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
    maxRetriesPerRequest: 3,
    retryDelayOnFailover: 100,
    lazyConnect: true,
  };

  if (config.REDIS_PASSWORD) {
    redisOptions.password = config.REDIS_PASSWORD;
  }

  redisClient = new Redis(redisOptions);

  redisClient.on('connect', () => {
    console.log('✅ Redis Connected');
  });

  redisClient.on('error', (err) => {
    console.error('❌ Redis Error:', err);
  });

  redisClient.on('close', () => {
    console.warn('⚠️ Redis Connection Closed');
  });

  // Graceful shutdown
  process.on('SIGINT', async () => {
    if (redisClient) {
      await redisClient.quit();
      console.log('🔒 Redis connection closed');
    }
  });

  return redisClient;
};

// Cloudinary Configuration
export const configureCloudinary = (): void => {
  if (!config.CLOUDINARY_CLOUD_NAME || !config.CLOUDINARY_API_KEY || !config.CLOUDINARY_API_SECRET) {
    console.warn('⚠️ Cloudinary credentials not fully configured. Image uploads may fail.');
    return;
  }

  cloudinary.config({
    cloud_name: config.CLOUDINARY_CLOUD_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
  });

  console.log('✅ Cloudinary Configured');
};

export const getCloudinary = () => {
  return cloudinary;
};

// Initialize all services
export const initializeServices = async (): Promise<void> => {
  try {
    await connectMongoDB();
    getRedisClient();
    configureCloudinary();
    console.log('✅ All services initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize services:', error);
    throw error;
  }
};

export default config;
