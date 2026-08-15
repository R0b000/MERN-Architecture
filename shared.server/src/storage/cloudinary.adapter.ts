import type { IStorageService, UploadFile } from './storage.interface';

export class CloudinaryService implements IStorageService {
  private cloudinary: any;

  constructor() {
    this.cloudinary = require('cloudinary').v2;
    this.cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
      api_key: process.env.CLOUDINARY_API_KEY || '',
      api_secret: process.env.CLOUDINARY_API_SECRET || '',
    });
  }

  async uploadFile(file: UploadFile, folder: string = ''): Promise<string> {
    const result = await this.cloudinary.uploader.upload(file.path || '', {
      folder,
    });
    return result.public_id;
  }

  async deleteFile(publicId: string): Promise<void> {
    await this.cloudinary.uploader.destroy(publicId);
  }

  getFileUrl(publicId: string): string {
    return this.cloudinary.url(publicId);
  }
}
