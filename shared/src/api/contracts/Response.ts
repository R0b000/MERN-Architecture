import type { IApiResponse } from './IApiResponse';

export class Response {
  static success<T>(data: T, messages: string[] = ['Operation completed successfully.'], statusCode = 200): IApiResponse<T> {
    return {
      data,
      success: true,
      messages,
      statusCode,
    };
  }

  static fail<T = null>(
    message: string,
    errors?: Record<string, string[]>,
    statusCode = 400
  ): IApiResponse<T> {
    return {
      data: null,
      success: false,
      messages: [message],
      errors,
      statusCode,
    };
  }

  static paginated<T>(
    data: T[],
    pagination: { page: number; limit: number; total: number },
    messages?: string[]
  ): IApiResponse<T[]> {
    const totalPages = Math.ceil(pagination.total / pagination.limit);
    return {
      data,
      success: true,
      messages: messages || ['Operation completed successfully.'],
      statusCode: 200,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total: pagination.total,
        totalPages,
      },
    } as any;
  }
}

export { Response as ApiResponse };
