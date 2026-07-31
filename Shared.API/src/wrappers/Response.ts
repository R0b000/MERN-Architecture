export interface IResponse<T> {
  success: boolean;
  data?: T;
  messages?: string[];
  errors?: string[];
  statusCode?: number;
}

export class Response {
  static success<T>(data: T, messages?: string[]): IResponse<T> {
    return {
      success: true,
      data,
      messages: messages || ['Operation completed successfully.'],
      statusCode: 200,
    };
  }

  static fail<T>(message: string, errors?: string[], statusCode: number = 400): IResponse<T> {
    return {
      success: false,
      data: undefined as unknown as T,
      messages: [message],
      errors: errors || [],
      statusCode,
    };
  }
}
