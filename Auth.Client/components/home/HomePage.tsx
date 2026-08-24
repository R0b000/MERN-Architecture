import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const HomePage = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.firstName}!</h1>
        <p className="text-gray-600">Email: {user.email}</p>
      </div>
    </div>
  );
};
