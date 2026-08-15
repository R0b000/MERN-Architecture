const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip || req.socket.remoteAddress;

  console.log(`[Request] ${timestamp} - ${method} ${url} - IP: ${ip}`);

  res.on('finish', () => {
    const statusCode = res.statusCode;
    console.log(`[Response] ${timestamp} - ${method} ${url} - Status: ${statusCode}`);
  });

  next();
};

module.exports = { requestLogger };
