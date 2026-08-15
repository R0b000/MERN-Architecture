import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { HttpProvider } from './context/HttpContext';
import { AuthProvider } from 'auth-client';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HttpProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </HttpProvider>
    </BrowserRouter>
  </React.StrictMode>
);
