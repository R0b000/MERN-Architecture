import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { RegisterForm } from '../register/RegisterForm';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
  const { register } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: { email: string; password: string; firstName: string; lastName: string }) => {
    setIsPending(true);
    setError(null);
    try {
      await register(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-center text-3xl font-bold text-gray-900">Sign Up</h1>
        <RegisterForm onSubmit={handleSubmit} isLoading={isPending} error={error} onLoginClick={() => navigate('/login')} />
      </div>
    </div>
  );
};
