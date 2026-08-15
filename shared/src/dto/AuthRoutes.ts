/**
 * Authentication Routes Configuration
 * All API endpoints for authentication operations
 */
export const AuthRoutes = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  PROFILE: '/api/auth/profile',
  CHANGE_PASSWORD: '/api/auth/change-password',
  FORGOT_PASSWORD: '/api/auth/forgot-password',
  RESET_PASSWORD: '/api/auth/reset-password',
} as const;

export type AuthRoutes = typeof AuthRoutes;
