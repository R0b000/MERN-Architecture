import { AuthAPIRoutes } from '../config/AuthAPIRoutes';
import { axiosConfig } from 'shared-ui/axios/AxiosConfig';
import type { IResponse } from 'shared-api/wrappers/IResponse';
import type { LoginRequest, RegisterRequest } from '../models/requests/AuthRequestMode';
import type { LoginResponse, RegisterResponse, UserProfileResponse } from '../models/responses/AuthResponseMode';

class AuthAPIService {
  async login(request: LoginRequest): Promise<IResponse<LoginResponse>> {
    const response = await axiosConfig.post<IResponse<LoginResponse>>(AuthAPIRoutes.LOGIN, request);
    return response.data;
  }

  async register(request: RegisterRequest): Promise<IResponse<RegisterResponse>> {
    const response = await axiosConfig.post<IResponse<RegisterResponse>>(AuthAPIRoutes.REGISTER, request);
    return response.data;
  }

  async getUserProfile(): Promise<IResponse<UserProfileResponse>> {
    const response = await axiosConfig.get<IResponse<UserProfileResponse>>(AuthAPIRoutes.PROFILE);
    return response.data;
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<IResponse<string>> {
    const response = await axiosConfig.post<IResponse<string>>(AuthAPIRoutes.CHANGE_PASSWORD, {
      currentPassword,
      newPassword,
    });
    return response.data;
  }

  async forgotPassword(email: string): Promise<IResponse<string>> {
    const response = await axiosConfig.post<IResponse<string>>(AuthAPIRoutes.FORGOT_PASSWORD, { email });
    return response.data;
  }

  async resetPassword(token: string, newPassword: string): Promise<IResponse<string>> {
    const response = await axiosConfig.post<IResponse<string>>(AuthAPIRoutes.RESET_PASSWORD, {
      token,
      newPassword,
    });
    return response.data;
  }
}

export const authAPIService = new AuthAPIService();
export { AuthAPIService };
export default AuthAPIService;
