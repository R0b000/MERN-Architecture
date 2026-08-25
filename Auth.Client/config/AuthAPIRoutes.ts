/**
 * Authentication Routes Configuration
 * All API endpoints for authentication operations
 */
export const AuthAPIRoutes = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  PROFILE: '/auth/profile',
  CHANGE_PASSWORD: '/auth/change-password',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
} as const;

export type AuthAPIRoutes = typeof AuthAPIRoutes;