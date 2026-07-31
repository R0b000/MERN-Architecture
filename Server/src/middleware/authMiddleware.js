const jwt = require('jsonwebtoken');
const { Response: ApiResponse } = require('shared-api');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const errorResponse = ApiResponse.fail('Access denied. No token provided.', [], 401);
      res.status(401).json(errorResponse);
      return;
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret');

    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      const errorResponse = ApiResponse.fail('Token expired.', [], 401);
      res.status(401).json(errorResponse);
    } else {
      const errorResponse = ApiResponse.fail('Invalid token.', [], 401);
      res.status(401).json(errorResponse);
    }
  }
};

const optionalAuthMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret');
      req.user = decoded;
    }

    next();
  } catch (error) {
    next();
  }
};

module.exports = { authMiddleware, optionalAuthMiddleware };