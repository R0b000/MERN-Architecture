import { useState } from 'react';
import { authAPIService } from '../services/AuthAPIService';
import { LoginCredentials } from '../models/config/appConfig';

export const useLogin = () => {
  const [data, setData] = useState<LoginResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const login = async (credentials: LoginCredentials) => {
    setIsPending(true);
    setError(null);
    try {
      const response = await authAPIService.login({
        email: credentials.email,
        password: credentials.password,
      });

      if (response.success && response.data) {
        setData(response.data);
        localStorage.setItem('authToken', response.data.token);
        return response.data;
      } else {
        const message = response.messages?.[0] || 'Login failed';
        setError(message);
        return null;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      return null;
    } finally {
      setIsPending(false);
    }
  };

  return { data, error, isPending, login };
};
