import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../Auth.Client/context/AuthContext';
import { ToastProvider } from '../portfolio.client/components/toast/ToastContext';
import { RouteRenderer } from 'shared-ui/router/RouteRenderer';
import { PortfolioRoutes } from '../portfolio.client/routes/routes';
import { LoginPage } from '../Auth.Client/components/login/LoginPage';
import { RegisterPage } from '../Auth.Client/components/register/RegisterPage';
import type { RouteConfig } from 'shared-ui/router/RouteRenderer.types';
import './global.css';

const combinedRoutes: RouteConfig = {
  layout: '',
  routes: [
    ...PortfolioRoutes.routes,
    { path: 'login', element: LoginPage },
    { path: 'register', element: RegisterPage },
  ],
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <React.Suspense fallback={
            <div className="min-h-screen bg-black text-[#f5f5f5] flex items-center justify-center font-mono">
              <div className="text-center space-y-4">
                <span className="w-3 h-3 bg-green-400 rounded-full inline-block animate-ping mr-2"></span>
                <span className="text-xs text-white/50 tracking-widest">&gt; BOOTING_SYSTEM...</span>
              </div>
            </div>
          }>
            <RouteRenderer config={combinedRoutes} />
          </React.Suspense>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
