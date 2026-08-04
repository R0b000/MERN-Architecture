import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'auth-client';
import type { LoginCredentials } from 'auth-client';

const useLoginLogic = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (credentials: LoginCredentials) => {
    setError(null);
    try {
      await login(credentials);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return { handleLogin, isLoading, error };
};

export default useLoginLogic;
