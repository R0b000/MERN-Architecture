import type { User } from '../entities/User';

export interface LoginResponse {
  token: string;
  user: User;
  expiresIn: number;
}
