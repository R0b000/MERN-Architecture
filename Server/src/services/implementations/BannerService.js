const { BannerRepository } = require('../../repositories/implementations/BannerRepository');
const { Response } = require('../../../Shared.API/src/wrappers/Response');
const { Logger } = require('../../../Shared.API/src/utils/Logger');

/**
 * Implementation of Banner service
 */
class BannerService {
  constructor() {
    this.bannerRepository = new BannerRepository();
  }

  /**
   * Create a new banner
   * @param {Object} request - Banner request
   * @returns {Promise<Object>}
   */
  async createBanner(request) {
    try {
      const banner = await this.bannerRepository.create(request);
      
      Logger.info('Banner created', { bannerId: banner._id, position: request.position });
      
      return Response.Success(banner, 'Banner created successfully', 201);
    } catch (error) {
      Logger.error('Failed to create banner', error);
      return Response.Fail('An error occurred while creating the banner');
    }
  }

  /**
   * Get banner by ID
   * @param {string} id - Banner ID
   * @returns {Promise<Object>}
   */
  async getBannerById(id) {
    try {
      const banner = await this.bannerRepository.findById(id);
      
      if (banner) {
        return Response.Success(banner, 'Banner retrieved successfully');
      } else {
        return Response.Fail('Banner not found', 404);
      }
    } catch (error) {
      Logger.error('Failed to get banner by ID', error);
      return Response.Fail('An error occurred while retrieving the banner');
    }
  }

  /**
   * Get active banners by position
   * @param {string} position - Banner position
   * @returns {Promise<Object>}
   */
  async getBannersByPosition(position) {
    try {
      const banners = await this.bannerRepository.findByPosition(position);
      
      return Response.Success(banners, 'Banners retrieved successfully');
    } catch (error) {
      Logger.error('Failed to get banners by position', error);
      return Response.Fail('An error occurred while retrieving banners');
    }
  }

  /**
   * Update a banner
   * @param {string} id - Banner ID
   * @param {Object} request - Updated banner data
   * @returns {Promise<Object>}
   */
  async updateBanner(id, request) {
    try {
      const existingBanner = await this.bannerRepository.findById(id);
      
      if (!existingBanner) {
        return Response.Fail('Banner not found', 404);
      }

      const banner = await this.bannerRepository.update(id, request);
      
      Logger.info('Banner updated', { bannerId: id });
      
      return Response.Success(banner, 'Banner updated successfully');
    } catch (error) {
      Logger.error('Failed to update banner', error);
      return Response.Fail('An error occurred while updating the banner');
    }
  }

  /**
   * Delete a banner
   * @param {string} id - Banner ID
   * @returns {Promise<Object>}
   */
  async deleteBanner(id) {
    try {
      const deleted = await this.bannerRepository.delete(id);
      
      if (deleted) {
        Logger.info('Banner deleted', { bannerId: id });
        return Response.Success(null, 'Banner deleted successfully');
      } else {
        return Response.Fail('Failed to delete banner');
      }
    } catch (error) {
      Logger.error('Failed to delete banner', error);
      return Response.Fail('An error occurred while deleting the banner');
    }
  }

  /**
   * Toggle banner active status
   * @param {string} id - Banner ID
   * @param {boolean} isActive - Active status
   * @returns {Promise<Object>}
   */
  async toggleBannerStatus(id, isActive) {
    try {
      const banner = await this.bannerRepository.toggleActiveStatus(id, isActive);
      
      if (banner) {
        Logger.info('Banner status toggled', { bannerId: id, isActive });
        return Response.Success(banner, `Banner ${isActive ? 'activated' : 'deactivated'} successfully`);
      } else {
        return Response.Fail('Banner not found', 404);
      }
    } catch (error) {
      Logger.error('Failed to toggle banner status', error);
      return Response.Fail('An error occurred while updating the banner status');
    }
  }

  /**
   * Get all banners (admin)
   * @param {Object} filter - Filter options
   * @param {number} page - Page number
   * @param {number} pageSize - Items per page
   * @returns {Promise<Object>}
   */
  async getAllBanners(filter, page, pageSize) {
    try {
      const result = await this.bannerRepository.findAll(filter, page, pageSize);
      
      return Response.Success({
        banners: result.banners,
        total: result.total,
        page: page || 1,
        pageSize: pageSize || 10,
        totalPages: Math.ceil(result.total / (pageSize || 10))
      }, 'Banners retrieved successfully');
    } catch (error) {
      Logger.error('Failed to get all banners', error);
      return Response.Fail('An error occurred while retrieving banners');
    }
  }
}

module.exports = { BannerService };

