import { Request, Response, NextFunction } from 'express';
import type { IApiResponse } from 'shared';
import { ErrorCode } from 'shared';
import { Logger } from '../utils/logger';

export class AppError extends Error {
  public statusCode: number;
  public code: ErrorCode;
  public isOperational: boolean;

  constructor(message: string, statusCode: number, code: ErrorCode = ErrorCode.INTERNAL_SERVER_ERROR, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  Logger.error(err.message, err);

  if (err instanceof AppError) {
    const response: IApiResponse<null> = {
      success: false,
      data: null,
      messages: [err.message],
      statusCode: err.statusCode,
    };
    return res.status(err.statusCode).json(response);
  }

  const response: IApiResponse<null> = {
    success: false,
    data: null,
    messages: ['Internal server error'],
    statusCode: 500,
  };
  return res.status(500).json(response);
};
