const mongoose = require('mongoose');
const { config } = require('../config');

let cachedConnection = null;

const connectDatabase = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  const connection = await mongoose.connect(config.mongoURI);
  cachedConnection = connection;
  console.log('[E.API] MongoDB connected successfully');
  return connection;
};

module.exports = { connectDatabase };
