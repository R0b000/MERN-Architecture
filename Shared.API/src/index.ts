// Shared.API - Main Export File
export { Response, type IResponse } from './wrappers/Response';

// Auth Models
export type { User, Role } from './models/auth/entities/AuthEntities';
export type {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
} from './models/auth/request/AuthRequests';
export type {
  LoginResponse,
  RegisterResponse,
  TokenResponse,
  UserProfileResponse,
} from './models/auth/response/AuthResponses';

// HRM Models (placeholder for future expansion)
// export type { Employee, Department } from './models/hrm/entities/HRMEntities';
// export type { EmployeeRequest } from './models/hrm/request/HRMRequests';
// export type { EmployeeResponse } from './models/hrm/response/HRMResponses';
