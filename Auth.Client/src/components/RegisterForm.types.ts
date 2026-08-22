import { RegisterData } from "@/models/config/appConfig";

export interface RegisterFormProps {
  onSubmit?: (data: RegisterData) => void;
  isLoading?: boolean;
  error?: string | null;
  onLoginClick?: () => void;
}
