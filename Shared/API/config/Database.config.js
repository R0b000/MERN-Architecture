const mongoose = require('mongoose');
const { config } = require('./config');

let cachedConnection = null;

const connectDatabase = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(config.mongoURI);
    cachedConnection = connection;
    console.log('[Auth.Server] MongoDB Atlas connected successfully');
    return connection;
  } catch (error) {
    console.error(`[Auth.Server] Failed to connect to Atlas MongoDB: ${error.message}`);
    const localURI = 'mongodb://127.0.0.1:27017/auth-server';
    console.log(`[Auth.Server] Attempting fallback to local MongoDB: ${localURI}`);
    const connection = await mongoose.connect(localURI);
    cachedConnection = connection;
    console.log('[Auth.Server] Local MongoDB connected successfully');
    return connection;
  }
};

module.exports = { connectDatabase };
