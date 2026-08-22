import axios, { AxiosInstance } from 'axios';
import { AuthRoutes } from '../routes/AuthRoutes';

class AuthAPIService {
  private api: AxiosInstance;

  constructor(baseURL: string = '') {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async login(request: LoginRequest): Promise<IResponse<LoginResponse>> {
    const response = await this.api.post<IResponse<LoginResponse>>(AuthRoutes.LOGIN, request);
    return response.data;
  }

  async register(request: RegisterRequest): Promise<IResponse<RegisterResponse>> {
    const response = await this.api.post<IResponse<RegisterResponse>>(AuthRoutes.REGISTER, request);
    return response.data;
  }

  async getUserProfile(): Promise<IResponse<UserProfileResponse>> {
    const response = await this.api.get<IResponse<UserProfileResponse>>(AuthRoutes.PROFILE);
    return response.data;
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<IResponse<string>> {
    const response = await this.api.post<IResponse<string>>(AuthRoutes.CHANGE_PASSWORD, {
      currentPassword,
      newPassword,
    });
    return response.data;
  }

  async forgotPassword(email: string): Promise<IResponse<string>> {
    const response = await this.api.post<IResponse<string>>(AuthRoutes.FORGOT_PASSWORD, { email });
    return response.data;
  }

  async resetPassword(token: string, newPassword: string): Promise<IResponse<string>> {
    const response = await this.api.post<IResponse<string>>(AuthRoutes.RESET_PASSWORD, {
      token,
      newPassword,
    });
    return response.data;
  }
}

export const authAPIService = new AuthAPIService();
export { AuthAPIService };
export default AuthAPIService;
