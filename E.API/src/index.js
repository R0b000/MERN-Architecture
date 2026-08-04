const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

dotenv.config();

const { config } = require('./config');
const { errorHandler } = require('./middleware/errorHandler');
const { requestLogger } = require('./middleware/requestLogger');
const { authMiddleware } = require('./middleware/authMiddleware');
const apiRoutes = require('./routes');
const { connectDatabase } = require('./database/connect');

const app = express();
const PORT = config.port;

app.use(helmet());
app.use(
  cors({
    origin: config.clientURL,
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

app.use(requestLogger);

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'E.API server is running',
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'E-Commerce API Server',
    version: '1.0.0',
    authRoutes: '/api/auth',
    productRoutes: '/api/products',
  });
});

app.use('/api', apiRoutes);

app.use(authMiddleware);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use(errorHandler);

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[E.API] Server is running on port ${PORT}`);
      console.log(`[E.API] Environment: ${config.nodeEnv}`);
      console.log(`[E.API] Auth module: Auth.Server (mounted at /api/auth)`);
    });
  })
  .catch((error) => {
    console.error('[E.API] Failed to connect to database:', error);
    process.exit(1);
  });

module.exports = app;
