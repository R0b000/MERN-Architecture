import type { User } from '../types/User';

export interface LoginResponse {
  token: string;
  user: User;
  expiresIn: number;
}
