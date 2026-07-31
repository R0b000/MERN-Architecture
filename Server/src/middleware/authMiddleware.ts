import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Response as ApiResponse } from 'shared-api';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const errorResponse = ApiResponse.fail('Access denied. No token provided.', [], 401);
      res.status(401).json(errorResponse);
      return;
    }

    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret') as {
      id: string;
      email: string;
      role: string;
    };

    // Attach user to request
    req.user = decoded;
    
    next();
  } catch (error) {
    if ((error as Error).name === 'TokenExpiredError') {
      const errorResponse = ApiResponse.fail('Token expired.', [], 401);
      res.status(401).json(errorResponse);
    } else {
      const errorResponse = ApiResponse.fail('Invalid token.', [], 401);
      res.status(401).json(errorResponse);
    }
  }
};

// Optional auth - doesn't fail if no token
export const optionalAuthMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret') as {
        id: string;
        email: string;
        role: string;
      };
      req.user = decoded;
    }
    
    next();
  } catch (error) {
    // Ignore errors for optional auth
    next();
  }
};
