import type { RegisterData } from '../types';

export interface RegisterFormProps {
  onSubmit?: (data: RegisterData) => void;
  isLoading?: boolean;
  error?: string | null;
  onLoginClick?: () => void;
}
