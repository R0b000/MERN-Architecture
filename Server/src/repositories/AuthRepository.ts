import { User, IUserDocument } from '../models/auth/User';
import { IResponse, Response } from 'shared-api';

export class AuthRepository {
  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<IUserDocument | null> {
    return await User.findOne({ email: email.toLowerCase() });
  }

  /**
   * Find user by ID
   */
  async findById(id: string): Promise<IUserDocument | null> {
    return await User.findById(id);
  }

  /**
   * Create new user
   */
  async create(userData: Partial<IUserDocument>): Promise<IUserDocument> {
    const user = new User(userData);
    return await user.save();
  }

  /**
   * Update user
   */
  async update(id: string, updateData: Partial<IUserDocument>): Promise<IUserDocument | null> {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  }

  /**
   * Delete user
   */
  async delete(id: string): Promise<boolean> {
    const result = await User.findByIdAndDelete(id);
    return result !== null;
  }

  /**
   * Check if email exists
   */
  async emailExists(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return user !== null;
  }
}
