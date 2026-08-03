/**
 * Interface for Banner repository
 */

/**
 * @typedef {import('../../../Shared.API/src/models/Ecommerce/entities/Banner').IBanner} IBanner
 * @typedef {import('../../../Shared.API/src/models/Ecommerce/requests/BannerRequests').ICreateBannerRequest} ICreateBannerRequest
 * @typedef {import('../../../Shared.API/src/models/Ecommerce/requests/BannerRequests').IUpdateBannerRequest} IUpdateBannerRequest
 */

class IBannerRepository {
  /**
   * Create a new banner
   * @param {ICreateBannerRequest} bannerData - Banner data
   * @returns {Promise<IBanner>}
   */
  async create(bannerData) {
    throw new Error('Method not implemented');
  }

  /**
   * Find banner by ID
   * @param {string} id - Banner ID
   * @returns {Promise<IBanner | null>}
   */
  async findById(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Get active banners by position
   * @param {string} position - Banner position
   * @returns {Promise<IBanner[]>}
   */
  async findByPosition(position) {
    throw new Error('Method not implemented');
  }

  /**
   * Update a banner
   * @param {string} id - Banner ID
   * @param {IUpdateBannerRequest} bannerData - Updated banner data
   * @returns {Promise<IBanner | null>}
   */
  async update(id, bannerData) {
    throw new Error('Method not implemented');
  }

  /**
   * Delete a banner
   * @param {string} id - Banner ID
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Get all banners with filters
   * @param {Object} filter - Filter options
   * @param {number} page - Page number
   * @param {number} pageSize - Items per page
   * @returns {Promise<{banners: IBanner[], total: number}>}
   */
  async findAll(filter, page, pageSize) {
    throw new Error('Method not implemented');
  }

  /**
   * Toggle banner active status
   * @param {string} id - Banner ID
   * @param {boolean} isActive - Active status
   * @returns {Promise<IBanner | null>}
   */
  async toggleActiveStatus(id, isActive) {
    throw new Error('Method not implemented');
  }
}

module.exports = { IBannerRepository };

