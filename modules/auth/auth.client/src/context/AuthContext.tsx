import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPIService } from '../services/AuthAPIService';
import type { User } from 'shared';
import type { AuthState, LoginCredentials, RegisterData } from '../types';

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>(() => ({
    user: null,
    token: localStorage.getItem('authToken'),
    isAuthenticated: !!localStorage.getItem('authToken'),
    isLoading: !!localStorage.getItem('authToken'),
  }));

  const setUser = (user: User | null) =>
    setState((prev) => ({ ...prev, user }));

  const setToken = (token: string | null) => {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
    setState((prev) => ({ ...prev, token, isAuthenticated: !!token }));
  };

  const refreshUser = async () => {
    if (!state.token) return;
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await authAPIService.getUserProfile();
      if (response.success && response.data) {
        setUser(response.data as unknown as User);
      } else {
        setToken(null);
        setUser(null);
      }
    } catch {
      setToken(null);
      setUser(null);
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    if (state.token && !state.user) {
      refreshUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.token]);

  const login = async (credentials: LoginCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await authAPIService.login({
        email: credentials.email,
        password: credentials.password,
      });
      if (response.success && response.data) {
        setToken(response.data.token);
        setUser(response.data.user as unknown as User);
      } else {
        throw new Error(response.messages?.[0] || 'Login failed');
      }
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const register = async (data: RegisterData) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await authAPIService.register({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      if (response.success && response.data) {
        setToken(null);
        await login({ email: data.email, password: data.password });
      } else {
        throw new Error(response.messages?.[0] || 'Registration failed');
      }
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
