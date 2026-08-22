import { useAuth } from '../../context/AuthContext';
import { LoginForm } from '../login/LoginForm';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const { login, error, isPending } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (credentials: { email: string; password: string }) => {
    await login(credentials);
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
