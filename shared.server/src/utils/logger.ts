export class Logger {
  static info(message: string, data?: any): void {
    console.log(`[INFO] ${message}`, data ? JSON.stringify(data) : '');
  }

  static error(message: string, error?: Error | any): void {
    console.error(`[ERROR] ${message}`, error ? error.stack || error.message : '');
  }

  static warn(message: string, data?: any): void {
    console.warn(`[WARN] ${message}`, data ? JSON.stringify(data) : '');
  }

  static debug(message: string, data?: any): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${message}`, data ? JSON.stringify(data) : '');
    }
  }
}
