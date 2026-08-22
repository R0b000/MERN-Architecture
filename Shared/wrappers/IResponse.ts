export interface IResponse<T = unknown> {
  success: boolean;
  data: T | null;
  messages: string[];
  errors?: string[];
  statusCode?: number;
}

export declare class Response {
  static success<T>(data: T, messages?: string[]): IResponse<T>;
  static fail<T>(message: string, errors?: string[], statusCode?: number): IResponse<T>;
}