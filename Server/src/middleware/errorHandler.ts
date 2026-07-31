import { Request, Response, NextFunction } from 'express';
import { Response as ApiResponse } from 'shared-api';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(`[Error] ${new Date().toISOString()}:`, err);

  // Default error response
  let statusCode = 500;
  let message = 'Internal server error';

  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  } else if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Unauthorized access';
  } else if (err.name === 'ForbiddenError') {
    statusCode = 403;
    message = 'Access forbidden';
  } else if (err.name === 'NotFoundError') {
    statusCode = 404;
    message = 'Resource not found';
  }

  const errorResponse = ApiResponse.fail(message, [err.message], statusCode);
  res.status(statusCode).json(errorResponse);
};
