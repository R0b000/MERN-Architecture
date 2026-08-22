import { useState } from 'react';
import { authAPIService } from '../services/AuthAPIService';
import { RegisterData } from '../models/config/appConfig';

export const useRegister = () => {
  const [data, setData] = useState<RegisterResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const register = async (registerData: RegisterData) => {
    setIsPending(true);
    setError(null);
    try {
      const response = await authAPIService.register({
        email: registerData.email,
        password: registerData.password,
        firstName: registerData.firstName,
        lastName: registerData.lastName,
      });

      if (response.success && response.data) {
        setData(response.data);
        return response.data;
      } else {
        const message = response.messages?.[0] || 'Registration failed';
        setError(message);
        return null;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      return null;
    } finally {
      setIsPending(false);
    }
  };

  return { data, error, isPending, register };
};
