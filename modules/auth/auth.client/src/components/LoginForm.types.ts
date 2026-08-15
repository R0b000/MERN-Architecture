import type { LoginCredentials } from '../types';

export interface LoginFormProps {
  onSubmit?: (credentials: LoginCredentials) => void;
  isLoading?: boolean;
  error?: string | null;
  onRegisterClick?: () => void;
}
