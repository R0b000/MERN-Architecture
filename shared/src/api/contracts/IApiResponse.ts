export interface IApiResponse<T = unknown> {
  success: boolean;
  data: T | null;
  messages: string[];
  errors?: Record<string, string[]>;
  statusCode: number;
}

export interface IPaginatedResponse<T = unknown> extends IApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
