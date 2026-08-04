import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from 'auth-client';
import Home from '@pages/Home';
import Products from '@pages/Products';
import Login from '@pages/auth/Login';
import Register from '@pages/auth/Register';

export const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
