export interface AuditLog {
  userId?: string;
  ip: string;
  action: string;
  resource?: string;
  timestamp: Date;
  userAgent?: string;
}

export class AuditLogger {
  static log(data: Omit<AuditLog, 'timestamp'>): void {
    const log: AuditLog = {
      ...data,
      timestamp: new Date(),
    };
    console.log(`[AUDIT] ${JSON.stringify(log)}`);
  }
}
