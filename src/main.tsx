import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../auth.client/context/AuthContext';
import { RouteRenderer } from 'shared-ui/router/RouteRenderer';
import { PortfolioHomePage } from '../portfolio.client/components/home/PortfolioHomePage';
import { HomePage } from '../auth.client/components/home/HomePage';
import { LoginPage } from '../auth.client/components/login/LoginPage';
import { RegisterPage } from '../auth.client/components/register/RegisterPage';
import type { RouteConfig } from 'shared-ui/router/RouteRenderer.types';
import './global.css';

const combinedRoutes: RouteConfig = {
  layout: '',
  routes: [
    { index: true, element: PortfolioHomePage },
    { path: 'login', element: LoginPage },
    { path: 'register', element: RegisterPage },
    { path: 'dashboard', element: HomePage },
  ],
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RouteRenderer config={combinedRoutes} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
