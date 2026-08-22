import type { User } from '../config/User';

export interface LoginResponse {
  token: string;
  user: User;
  expiresIn: number;
}
export interface RegisterResponse {
  userId: string;
  message: string;
}
export interface UserProfileResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}
