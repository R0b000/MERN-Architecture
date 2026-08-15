export interface UploadFile {
  originalname: string;
  buffer: Buffer;
  path?: string;
  mimetype: string;
  size: number;
}

export interface IStorageService {
  uploadFile(file: UploadFile, folder?: string): Promise<string>;
  deleteFile(publicId: string): Promise<void>;
  getFileUrl(publicId: string): string;
}
