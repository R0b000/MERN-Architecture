import type { Request, Response, NextFunction } from 'express';
import { Logger } from '../utils/logger';

export const requestLogger = (req: Request, _res: Response, next: NextFunction): void => {
  const start = Date.now();
  next();
  const duration = Date.now() - start;
  Logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    duration: `${duration}ms`,
    userAgent: req.get('User-Agent'),
  });
};
