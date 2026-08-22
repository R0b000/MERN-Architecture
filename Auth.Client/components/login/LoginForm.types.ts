import { LoginCredentials } from "../../models/config/appConfig";

export interface LoginFormProps {
  onSubmit?: (credentials: LoginCredentials) => void;
  isLoading?: boolean;
  error?: string | null;
  onRegisterClick?: () => void;
}
