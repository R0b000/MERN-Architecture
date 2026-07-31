import { IResponse } from 'shared-api';
import { LoginRequest, RegisterRequest, LoginResponse, UserProfileResponse } from 'shared-api';

export interface IAuthService {
  login(request: LoginRequest): Promise<IResponse<LoginResponse>>;
  register(request: RegisterRequest): Promise<IResponse<{ userId: string; message: string }>>;
  getUserProfile(userId: string): Promise<IResponse<UserProfileResponse>>;
  changePassword(userId: string, currentPassword: string, newPassword: string): Promise<IResponse<string>>;
  forgotPassword(email: string): Promise<IResponse<string>>;
  resetPassword(token: string, newPassword: string): Promise<IResponse<string>>;
}
