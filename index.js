require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const { config } = require('./Shared/API/config/config');
const { connectDatabase } = require('./Shared/API/config/Database.config');
const {authRouter} = require('./auth.server/controllers/AuthController');
const {portfolioRouter} = require('./portfolio.server/controllers/PortfolioController');

const app = express();
const PORT = config.port || process.env.PORT || 5001;

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

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Auth.Server is running',
    timestamp: new Date().toISOString(),
  });
});

const path = require('path');

// Use AuthRouter in case of auth routes 
app.use('/api/auth', authRouter);
app.use('/api/portfolio', portfolioRouter);

// Serve static assets in production
if (process.env.NODE_ENV === 'production' || config.nodeEnv === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use((err, req, res, next) => {
  console.error(`[Error] ${new Date().toISOString()}:`, err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    errors: [err.message],
  });
});

const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
      console.log(`Server Environment: ${config.nodeEnv}`);
    });
  } catch (error) {
    console.error('Server Failed to connect to database:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = app;
module.exports.startServer = startServer;