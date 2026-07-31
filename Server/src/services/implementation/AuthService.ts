import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IResponse, Response } from 'shared-api';
import { LoginRequest, RegisterRequest, LoginResponse, UserProfileResponse } from 'shared-api';
import { IAuthService } from '../interface/IAuthService';
import { AuthRepository } from '../../repositories/AuthRepository';

export class AuthService implements IAuthService {
  private authRepository: AuthRepository;
  private readonly JWT_SECRET: string;
  private readonly JWT_EXPIRES_IN: string;

  constructor() {
    this.authRepository = new AuthRepository();
    this.JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key';
    this.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
  }

  /**
   * Login user and generate token
   */
  async login(request: LoginRequest): Promise<IResponse<LoginResponse>> {
    try {
      const { email, password } = request;

      // Find user by email
      const user = await this.authRepository.findByEmail(email);
      
      if (!user) {
        return Response.fail('Invalid email or password', [], 401);
      }

      // Check if user is active
      if (!user.isActive) {
        return Response.fail('Account is deactivated. Please contact support.', [], 403);
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        return Response.fail('Invalid email or password', [], 401);
      }

      // Generate JWT token
      const tokenPayload = {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
      };

      const token = jwt.sign(tokenPayload, this.JWT_SECRET, {
        expiresIn: this.JWT_EXPIRES_IN,
      });

      const loginResponse: LoginResponse = {
        token,
        user: {
          id: user._id.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        expiresIn: parseInt(this.JWT_EXPIRES_IN) || 86400,
      };

      return Response.success(loginResponse, ['Login successful']);
    } catch (error) {
      console.error('[AuthService.login] Error:', error);
      return Response.fail('Login failed', [(error as Error).message], 500);
    }
  }

  /**
   * Register new user
   */
  async register(request: RegisterRequest): Promise<IResponse<{ userId: string; message: string }>> {
    try {
      const { email, password, firstName, lastName, role = 'user' } = request;

      // Check if email already exists
      const emailExists = await this.authRepository.emailExists(email);
      
      if (emailExists) {
        return Response.fail('Email already registered', [], 400);
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      const userData = {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role,
        isActive: true,
      };

      const newUser = await this.authRepository.create(userData);

      const registerResponse = {
        userId: newUser._id.toString(),
        message: 'User registered successfully',
      };

      return Response.success(registerResponse, ['Registration successful']);
    } catch (error) {
      console.error('[AuthService.register] Error:', error);
      return Response.fail('Registration failed', [(error as Error).message], 500);
    }
  }

  /**
   * Get user profile
   */
  async getUserProfile(userId: string): Promise<IResponse<UserProfileResponse>> {
    try {
      const user = await this.authRepository.findById(userId);

      if (!user) {
        return Response.fail('User not found', [], 404);
      }

      const profileResponse: UserProfileResponse = {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
      };

      return Response.success(profileResponse, ['Profile retrieved successfully']);
    } catch (error) {
      console.error('[AuthService.getUserProfile] Error:', error);
      return Response.fail('Failed to get profile', [(error as Error).message], 500);
    }
  }

  /**
   * Change password
   */
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<IResponse<string>> {
    try {
      const user = await this.authRepository.findById(userId);

      if (!user) {
        return Response.fail('User not found', [], 404);
      }

      // Verify current password
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      
      if (!isPasswordValid) {
        return Response.fail('Current password is incorrect', [], 400);
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update password
      await this.authRepository.update(userId, { password: hashedPassword });

      return Response.success('Password changed successfully', ['Password updated successfully']);
    } catch (error) {
      console.error('[AuthService.changePassword] Error:', error);
      return Response.fail('Failed to change password', [(error as Error).message], 500);
    }
  }

  /**
   * Forgot password - send reset token
   */
  async forgotPassword(email: string): Promise<IResponse<string>> {
    try {
      const user = await this.authRepository.findByEmail(email);

      if (!user) {
        // Return success anyway to prevent email enumeration
        return Response.success('If the email exists, a reset link will be sent.', []);
      }

      // Generate reset token
      const resetToken = jwt.sign({ id: user._id.toString() }, this.JWT_SECRET, {
        expiresIn: '1h',
      });

      // TODO: Send email with reset token
      console.log('Reset token:', resetToken);

      return Response.success('Password reset link sent to email', []);
    } catch (error) {
      console.error('[AuthService.forgotPassword] Error:', error);
      return Response.fail('Failed to process request', [(error as Error).message], 500);
    }
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<IResponse<string>> {
    try {
      // Verify token
      const decoded = jwt.verify(token, this.JWT_SECRET) as { id: string };

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update password
      await this.authRepository.update(decoded.id, { password: hashedPassword });

      return Response.success('Password reset successfully', ['Password has been reset']);
    } catch (error) {
      console.error('[AuthService.resetPassword] Error:', error);
      return Response.fail('Invalid or expired token', [(error as Error).message], 400);
    }
  }
}
