import { HttpService } from './HttpService';

interface IBanner {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl: string;
  mobileImageUrl?: string;
  linkUrl: string;
  linkText?: string;
  position: string;
  sortOrder: number;
  isActive: boolean;
}

interface IBannerFormData {
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl: string;
  mobileImageUrl?: string;
  linkUrl: string;
  linkText?: string;
  position: string;
  sortOrder: number;
}

export class BannerService {
  private static baseURL = '/api/banners';
  private static adminURL = '/api/admin/banners';

  /**
   * Get all banners (admin)
   */
  static async getAllBanners(params: { page: number; pageSize: number }) {
    return await HttpService.get<{
      banners: IBanner[];
      total: number;
      page: number;
      pageSize: number;
      totalPages: number;
    }>(`${this.adminURL}?page=${params.page}&pageSize=${params.pageSize}`);
  }

  /**
   * Get banner by ID
   */
  static async getBannerById(id: string) {
    return await HttpService.get<IBanner>(`${this.baseURL}/${id}`);
  }

  /**
   * Get banners by position
   */
  static async getBannersByPosition(position: string) {
    return await HttpService.get<IBanner[]>(`${this.baseURL}/position/${position}`);
  }

  /**
   * Create a new banner
   */
  static async createBanner(data: IBannerFormData) {
    return await HttpService.post<IBanner>(this.adminURL, data);
  }

  /**
   * Update a banner
   */
  static async updateBanner(id: string, data: Partial<IBannerFormData>) {
    return await HttpService.put<IBanner>(`${this.adminURL}/${id}`, data);
  }

  /**
   * Delete a banner
   */
  static async deleteBanner(id: string) {
    return await HttpService.delete(`${this.adminURL}/${id}`);
  }

  /**
   * Toggle banner active status
   */
  static async toggleBannerStatus(id: string, isActive: boolean) {
    return await HttpService.put<IBanner>(`${this.adminURL}/${id}/toggle`, { isActive });
  }
}

