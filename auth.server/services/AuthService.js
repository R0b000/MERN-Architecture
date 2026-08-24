const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Response } = require('../../Shared/API/wrappers/Response');
const { User } = require('../models/database/User');
const { config } = require('../../Shared/API/config/config');

class AuthService {
  constructor() {
    this.JWT_SECRET = config.jwtSecret;
    this.JWT_EXPIRES_IN = config.jwtExpiresIn;
  }

  async login(request) {
    try {
      const { email, password } = request;

      const user = await User.findOne({ email }).exec();

      if (!user) {
        return Response.fail('Invalid email or password', [], 401);
      }

      if (!user.isActive) {
        return Response.fail('Account is deactivated. Please contact support.', [], 403);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return Response.fail('Invalid email or password', [], 401);
      }

      const tokenPayload = {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
      };

      const token = jwt.sign(tokenPayload, this.JWT_SECRET, {
        expiresIn: this.JWT_EXPIRES_IN,
      });

      const loginResponse = {
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
      return Response.fail('Login failed', [error.message], 500);
    }
  }

  async register(request) {
    try {
      const { email, password, firstName, lastName, role = 'user' } = request;

      const emailExists = await User.countDocuments({ email }).exec();

      if (emailExists) {
        return Response.fail('Email already registered', [], 400);
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userData = {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role,
        isActive: true,
      };

      const newUser = await User.create(userData);

      const registerResponse = {
        userId: newUser._id.toString(),
        message: 'User registered successfully',
      };

      return Response.success(registerResponse, ['Registration successful']);
    } catch (error) {
      console.error('[AuthService.register] Error:', error);
      return Response.fail('Registration failed', [error.message], 500);
    }
  }

  async getUserProfile(userId) {
    try {
      const user = await User.findById(userId).exec();

      if (!user) {
        return Response.fail('User not found', [], 404);
      }

      const profileResponse = {
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
      return Response.fail('Failed to get profile', [error.message], 500);
    }
  }

  async changePassword(userId, currentPassword, newPassword) {
    try {
      const user = await User.findById(userId).exec();

      if (!user) {
        return Response.fail('User not found', [], 404);
      }

      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

      if (!isPasswordValid) {
        return Response.fail('Current password is incorrect', [], 400);
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true }).exec();

      return Response.success('Password changed successfully', ['Password updated successfully']);
    } catch (error) {
      console.error('[AuthService.changePassword] Error:', error);
      return Response.fail('Failed to change password', [error.message], 500);
    }
  }

  async forgotPassword(email) {
    try {
      const user = await User.findOne({ email }).exec();

      if (!user) {
        return Response.success('If the email exists, a reset link will be sent.', []);
      }

      const resetToken = jwt.sign({ id: user._id.toString() }, this.JWT_SECRET, {
        expiresIn: '1h',
      });

      console.log('Reset token:', resetToken);

      return Response.success('Password reset link sent to email', []);
    } catch (error) {
      console.error('[AuthService.forgotPassword] Error:', error);
      return Response.fail('Failed to process request', [error.message], 500);
    }
  }

  async resetPassword(token, newPassword) {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await User.findByIdAndUpdate(decoded.id, { password: hashedPassword }, { new: true }).exec();

      return Response.success('Password reset successfully', ['Password has been reset']);
    } catch (error) {
      console.error('[AuthService.resetPassword] Error:', error);
      return Response.fail('Invalid or expired token', [error.message], 400);
    }
  }
}

module.exports = { AuthService };
