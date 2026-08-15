import type { Request, Response, NextFunction } from 'express';
import { AuditLogger } from '../utils/audit';

export const auditMiddleware = (action: string) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    AuditLogger.log({
      userId: (req as any).user?.id,
      ip: req.ip || '',
      action,
      resource: req.path,
      userAgent: req.get('User-Agent') || undefined,
    });
    next();
  };
};
