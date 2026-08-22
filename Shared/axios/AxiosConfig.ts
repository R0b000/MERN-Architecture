import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IResponse } from '../wrappers/IResponse';

/**
 * Creates an Axios instance with authentication interceptors
 * - Automatically attaches JWT token from localStorage to requests
 * - Clears authToken on 401 Unauthorized responses
 */
export const axiosConfig = (baseURL: string = ''): AxiosInstance => {
  const api: AxiosInstance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token && config.headers) {
        config.headers.set('Authorization', `Bearer ${token}`);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response: AxiosResponse<IResponse<unknown>>) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('authToken');
      }
      return Promise.reject(error);
    }
  );

  return api;
};
