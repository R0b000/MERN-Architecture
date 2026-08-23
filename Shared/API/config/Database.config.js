const mongoose = require('mongoose');

let cachedConnection = null;

const connectDatabase = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  const connection = await mongoose.connect(config.mongoURI);
  cachedConnection = connection;
  console.log('[Auth.Server] MongoDB connected successfully');
  return connection;
};

module.exports = { connectDatabase };
