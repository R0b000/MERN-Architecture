import { useNavigate } from 'react-router-dom';
import { useAuth, useLogout } from 'auth-client';
import { useHttp } from '@/context/HttpContext';

const useHomeLogic = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { httpService } = useHttp();

  const handleLogout = () => {
    logout();
    httpService.removeToken();
    navigate('/login');
  };

  return {
    user,
    isAuthenticated,
    handleLogout,
  };
};

export default useHomeLogic;
