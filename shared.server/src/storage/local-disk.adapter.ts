import type { IStorageService, UploadFile } from './storage.interface';

export class LocalDiskService implements IStorageService {
  private uploadDir: string;

  constructor(uploadDir: string = 'uploads/') {
    this.uploadDir = uploadDir;
  }

  async uploadFile(file: UploadFile, folder: string = ''): Promise<string> {
    const fs = await import('fs');
    const path = await import('path');
    const dir = path.join(this.uploadDir, folder);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const filename = `${Date.now()}-${file.originalname}`;
    const filepath = path.join(dir, filename);
    fs.writeFileSync(filepath, file.buffer);
    return filepath;
  }

  async deleteFile(publicId: string): Promise<void> {
    const fs = await import('fs');
    if (fs.existsSync(publicId)) {
      fs.unlinkSync(publicId);
    }
  }

  getFileUrl(publicId: string): string {
    return `/uploads/${publicId}`;
  }
}
