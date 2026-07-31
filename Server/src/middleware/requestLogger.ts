import { Request, Response, NextFunction } from 'express';

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip || req.socket.remoteAddress;
  
  console.log(`[Request] ${timestamp} - ${method} ${url} - IP: ${ip}`);
  
  // Log response when finished
  res.on('finish', () => {
    const statusCode = res.statusCode;
    console.log(`[Response] ${timestamp} - ${method} ${url} - Status: ${statusCode}`);
  });
  
  next();
};
