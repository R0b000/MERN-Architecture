// Auth Models - Response Models
export interface LoginResponse {
  token: string;
  refreshToken?: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  expiresIn: number;
}

export interface RegisterResponse {
  userId: string;
  message: string;
}

export interface TokenResponse {
  token: string;
  expiresIn: number;
}

export interface UserProfileResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
}
