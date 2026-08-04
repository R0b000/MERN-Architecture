export type { IResponse } from './wrappers/IResponse';

export declare class Response {
  static success<T>(data: T, messages?: string[]): IResponse<T>;
  static fail<T>(message: string, errors?: string[], statusCode?: number): IResponse<T>;
}

export type * from './models';
