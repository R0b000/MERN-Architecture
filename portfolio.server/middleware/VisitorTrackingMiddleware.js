const { Portfolio } = require('../models/database/Portfolio');

const visitorTrackingMiddleware = async (req, res, next) => {
  try {
    if (req.path === '/') {
      console.log('[VisitorTrackingMiddleware] Home route visited. Incrementing view counter...');
      await Portfolio.findOneAndUpdate({}, { $inc: { 'analytics.views': 1 } }).exec();
    }
  } catch (error) {
    console.error('[VisitorTrackingMiddleware] Error incrementing views:', error);
  }
  next();
};

module.exports = { visitorTrackingMiddleware };
