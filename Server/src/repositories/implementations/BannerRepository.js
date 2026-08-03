const Banner = require('../../models/ecommerce/Banner.model');

/**
 * Implementation of Banner repository
 */
class BannerRepository {
  /**
   * Create a new banner
   * @param {Object} bannerData - Banner data
   * @returns {Promise<Object>}
   */
  async create(bannerData) {
    const banner = await Banner.create({
      ...bannerData,
      isActive: true
    });
    return banner.toObject();
  }

  /**
   * Find banner by ID
   * @param {string} id - Banner ID
   * @returns {Promise<Object | null>}
   */
  async findById(id) {
    const banner = await Banner.findById(id).exec();
    return banner ? banner.toObject() : null;
  }

  /**
   * Get active banners by position
   * @param {string} position - Banner position
   * @returns {Promise<Object[]>}
   */
  async findByPosition(position) {
    const now = new Date();
    const query = {
      position,
      isActive: true,
      $or: [
        { startDate: { $lte: now }, endDate: { $gte: now } },
        { startDate: { $exists: false }, endDate: { $exists: false } },
        { startDate: null, endDate: null }
      ]
    };

    const banners = await Banner.find(query)
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    return banners;
  }

  /**
   * Update a banner
   * @param {string} id - Banner ID
   * @param {Object} bannerData - Updated banner data
   * @returns {Promise<Object | null>}
   */
  async update(id, bannerData) {
    const banner = await Banner.findByIdAndUpdate(
      id,
      { $set: bannerData },
      { new: true, runValidators: true }
    ).exec();
    return banner ? banner.toObject() : null;
  }

  /**
   * Delete a banner
   * @param {string} id - Banner ID
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    const result = await Banner.findByIdAndDelete(id).exec();
    return !!result;
  }

  /**
   * Get all banners with filters
   * @param {Object} filter - Filter options
   * @param {number} page - Page number
   * @param {number} pageSize - Items per page
   * @returns {Promise<{banners: Object[], total: number}>}
   */
  async findAll(filter, page, pageSize) {
    const { position, isActive } = filter || {};
    const query = {};

    if (position) query.position = position;
    if (isActive !== undefined) query.isActive = isActive;

    const skip = (page - 1) * pageSize;

    const [banners, total] = await Promise.all([
      Banner.find(query)
        .sort({ sortOrder: 1, createdAt: -1 })
        .skip(skip)
        .limit(pageSize)
        .lean(),
      Banner.countDocuments(query)
    ]);

    return { banners, total };
  }

  /**
   * Toggle banner active status
   * @param {string} id - Banner ID
   * @param {boolean} isActive - Active status
   * @returns {Promise<Object | null>}
   */
  async toggleActiveStatus(id, isActive) {
    const banner = await Banner.findByIdAndUpdate(
      id,
      { $set: { isActive } },
      { new: true }
    ).exec();
    return banner ? banner.toObject() : null;
  }
}

module.exports = { BannerRepository };

