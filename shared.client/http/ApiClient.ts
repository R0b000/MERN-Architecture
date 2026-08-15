import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { IApiResponse, HttpMethod } from 'shared/api';

export class ApiClient {
  private static instance: AxiosInstance;

  static getInstance(): AxiosInstance {
    if (!ApiClient.instance) {
      ApiClient.instance = axios.create({
        baseURL: import.meta.env.VITE_API_URL || '/api',
        headers: { 'Content-Type': 'application/json' },
      });

      ApiClient.instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
          const token = localStorage.getItem('authToken');
          if (token && config.headers) {
            config.headers.set('Authorization', `Bearer ${token}`);
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

      ApiClient.instance.interceptors.response.use(
        (response: AxiosResponse<IApiResponse<unknown>>) => response,
        async (error) => {
          if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
          return Promise.reject(error);
        }
      );
    }
    return ApiClient.instance;
  }

  static async request<T>(
    method: HttpMethod,
    url: string,
    data?: unknown,
    config?: any
  ): Promise<IApiResponse<T>> {
    const api = ApiClient.getInstance();
    const methodLower = method.toLowerCase() as any;
    try {
      const response = await api.request({ method: methodLower, url, data, ...config });
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data as IApiResponse<T>;
      }
      return {
        success: false,
        data: null,
        messages: [error.message || 'Request failed'],
        statusCode: error.response?.status || 500,
      };
    }
  }

  static async get<T>(url: string, config?: any): Promise<IApiResponse<T>> {
    return ApiClient.request<T>(HttpMethod.GET, url, undefined, config);
  }

  static async post<T>(url: string, data?: unknown, config?: any): Promise<IApiResponse<T>> {
    return ApiClient.request<T>(HttpMethod.POST, url, data, config);
  }

  static async put<T>(url: string, data?: unknown, config?: any): Promise<IApiResponse<T>> {
    return ApiClient.request<T>(HttpMethod.PUT, url, data, config);
  }

  static async patch<T>(url: string, data?: unknown, config?: any): Promise<IApiResponse<T>> {
    return ApiClient.request<T>(HttpMethod.PATCH, url, data, config);
  }

  static async delete<T>(url: string, config?: any): Promise<IApiResponse<T>> {
    return ApiClient.request<T>(HttpMethod.DELETE, url, undefined, config);
  }

  static async search<T>(url: string, payload: any, config?: any): Promise<IApiResponse<T[]>> {
    return ApiClient.request<T[]>(HttpMethod.SEARCH, url, payload, config);
  }

  static setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  static getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  static removeToken(): void {
    localStorage.removeItem('authToken');
  }
}

export default ApiClient;
