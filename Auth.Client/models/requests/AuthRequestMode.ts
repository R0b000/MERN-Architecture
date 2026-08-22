export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}
export interface ForgotPasswordRequest {
  email: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}
export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
}
export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}
