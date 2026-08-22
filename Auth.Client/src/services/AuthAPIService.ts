import { AuthRoutes } from '../config/AuthAPIRoutes';

class AuthAPIService {
  async login(request: LoginRequest): Promise<IResponse<LoginResponse>> {
    const response = await axiosConfig.post<IResponse<LoginResponse>>(AuthRoutes.LOGIN, request);
    return response.data;
  }

  async register(request: RegisterRequest): Promise<IResponse<RegisterResponse>> {
    const response = await axiosConfig.post<IResponse<RegisterResponse>>(AuthRoutes.REGISTER, request);
    return response.data;
  }

  async getUserProfile(): Promise<IResponse<UserProfileResponse>> {
    const response = await axiosConfig.get<IResponse<UserProfileResponse>>(AuthRoutes.PROFILE);
    return response.data;
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<IResponse<string>> {
    const response = await axiosConfig.post<IResponse<string>>(AuthRoutes.CHANGE_PASSWORD, {
      currentPassword,
      newPassword,
    });
    return response.data;
  }

  async forgotPassword(email: string): Promise<IResponse<string>> {
    const response = await axiosConfig.post<IResponse<string>>(AuthRoutes.FORGOT_PASSWORD, { email });
    return response.data;
  }

  async resetPassword(token: string, newPassword: string): Promise<IResponse<string>> {
    const response = await axiosConfig.post<IResponse<string>>(AuthRoutes.RESET_PASSWORD, {
      token,
      newPassword,
    });
    return response.data;
  }
}

export const authAPIService = new AuthAPIService();
export { AuthAPIService };
export default AuthAPIService;
