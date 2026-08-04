import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'auth-client';
import type { RegisterData } from 'auth-client';

const useRegisterLogic = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (data: RegisterData) => {
    setError(null);
    try {
      await register(data);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  return { handleRegister, isLoading, error };
};

export default useRegisterLogic;
