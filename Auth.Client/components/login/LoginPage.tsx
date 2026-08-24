import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LoginForm } from './LoginForm';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (credentials: { email: string; password: string }) => {
    setIsPending(true);
    setError(null);
    try {
      await login(credentials);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-center text-3xl font-bold text-gray-900">Sign In</h1>
        <LoginForm onSubmit={handleSubmit} isLoading={isPending} error={error} onRegisterClick={() => navigate('/register')} />
      </div>
    </div>
  );
};
