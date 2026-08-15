const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

const config = {
  jwtSecret: process.env.JWT_SECRET || 'default-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/auth-server',
  clientURL: process.env.CLIENT_URL || 'http://localhost:3000',
  cloudinaryUrl: process.env.CLOUDINARY_URL || '',
  redisUrl: process.env.REDIS_URL || '',
};

module.exports = { config };
