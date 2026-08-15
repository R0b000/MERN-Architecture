import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import { ApiResponse } from 'shared';

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json(ApiResponse.fail('Access denied. No token provided.', undefined, 401));
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    req.user = decoded;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json(ApiResponse.fail('Token expired.', undefined, 401));
      return;
    }
    res.status(401).json(ApiResponse.fail('Invalid token.', undefined, 401));
  }
};
