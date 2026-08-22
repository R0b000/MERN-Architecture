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
