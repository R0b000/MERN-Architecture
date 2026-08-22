import { useAuth } from '../../context/AuthContext';
import { RegisterForm } from '../register/RegisterForm';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
  const { register, error, isPending } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (data: { email: string; password: string; firstName: string; lastName: string }) => {
    await register(data);
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
