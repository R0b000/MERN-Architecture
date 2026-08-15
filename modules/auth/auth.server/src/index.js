const { authRouter } = require('./controllers/AuthController');
const { authMiddleware, optionalAuthMiddleware } = require('./middleware/AuthMiddleware');
const { AuthService } = require('./services/implementations/AuthService');
const { AuthRepository } = require('./repositories/implementations/AuthRepository');
const { connectDatabase } = require('./config/Database.config');

module.exports = {
  authRouter,
  authMiddleware,
  optionalAuthMiddleware,
  AuthService,
  AuthRepository,
  connectDatabase,
};
