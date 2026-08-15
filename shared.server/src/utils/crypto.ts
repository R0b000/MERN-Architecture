import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export class CryptoUtils {
  static generateToken(payload: object, secret: string, expiresIn: string): string {
    return jwt.sign(payload, secret, { expiresIn } as any);
  }

  static verifyToken(token: string, secret: string): any {
    return jwt.verify(token, secret);
  }

  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  static generateOTP(length: number = 6): string {
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += crypto.randomInt(0, 10);
    }
    return otp;
  }

  static generateRandomToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }
}
