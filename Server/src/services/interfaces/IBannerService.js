const { Response } = require('../../../Shared.API/src/wrappers/Response');
const { Logger } = require('../../../Shared.API/src/utils/Logger');

/**
 * Interface for Banner service
 */

class IBannerService {
  /**
   * Create a new banner
   * @param {Object} request - Banner request
   * @returns {Promise<Object>}
   */
  async createBanner(request) {
    throw new Error('Method not implemented');
  }

  /**
   * Get banner by ID
   * @param {string} id - Banner ID
   * @returns {Promise<Object>}
   */
  async getBannerById(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Get active banners by position
   * @param {string} position - Banner position
   * @returns {Promise<Object>}
   */
  async getBannersByPosition(position) {
    throw new Error('Method not implemented');
  }

  /**
   * Update a banner
   * @param {string} id - Banner ID
   * @param {Object} request - Updated banner data
   * @returns {Promise<Object>}
   */
  async updateBanner(id, request) {
    throw new Error('Method not implemented');
  }

  /**
   * Delete a banner
   * @param {string} id - Banner ID
   * @returns {Promise<Object>}
   */
  async deleteBanner(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Toggle banner active status
   * @param {string} id - Banner ID
   * @param {boolean} isActive - Active status
   * @returns {Promise<Object>}
   */
  async toggleBannerStatus(id, isActive) {
    throw new Error('Method not implemented');
  }

  /**
   * Get all banners (admin)
   * @param {Object} filter - Filter options
   * @param {number} page - Page number
   * @param {number} pageSize - Items per page
   * @returns {Promise<Object>}
   */
  async getAllBanners(filter, page, pageSize) {
    throw new Error('Method not implemented');
  }
}

module.exports = { IBannerService };

