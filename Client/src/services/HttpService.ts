import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { IResponse, Response } from 'shared-api';

class HttpService {
  private api: AxiosInstance;

  constructor(baseURL: string = '/api') {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse<IResponse<unknown>>) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized - redirect to login
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<IResponse<T>> {
    try {
      const response = await this.api.get<IResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<IResponse<T>> {
    try {
      const response = await this.api.post<IResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<IResponse<T>> {
    try {
      const response = await this.api.put<IResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<IResponse<T>> {
    try {
      const response = await this.api.delete<IResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): IResponse<never> {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data as IResponse<never>;
      if (errorData) {
        return errorData;
      }
      return Response.fail(error.message || 'Request failed', [], error.response?.status || 500);
    }
    return Response.fail('An unexpected error occurred', [], 500);
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  removeToken(): void {
    localStorage.removeItem('authToken');
  }
}

// Export singleton instance
export const httpService = new HttpService();
export default HttpService;
