export interface IResponse<T = unknown> {
  success: boolean;
  data: T | null;
  messages: string[];
  errors?: string[];
  statusCode?: number;
}
