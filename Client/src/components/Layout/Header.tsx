import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Button } from 'shared-ui/components/Button/Button';
import './Header.css';

export const Header: React.FC = () => {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const { totalItems } = useCart();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <span className="text-2xl font-bold text-blue-600">ShopHub</span>
        </Link>

        <nav className="header-nav">
          <Link to="/" className="header-link">Home</Link>
          <Link to="/products" className="header-link">Products</Link>
          <Link to="/categories" className="header-link">Categories</Link>
          {isAdmin && (
            <Link to="/admin" className="header-link text-red-600">Admin</Link>
          )}
        </nav>

        <div className="header-actions">
          <Link to="/cart" className="header-cart">
            <span className="relative">
              🛒
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </span>
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Hi, {user?.name}</span>
              <Button size="small" variant="secondary" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login">
                <Button size="small" variant="secondary">Login</Button>
              </Link>
              <Link to="/register">
                <Button size="small" variant="primary">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
