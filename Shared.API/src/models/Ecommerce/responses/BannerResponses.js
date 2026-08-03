/**
 * Banner responses for promotional content management
 */

/**
 * @typedef {Object} IBannerResponse
 * @property {string} _id - Banner ID
 * @property {string} title - Banner title
 * @property {string} subtitle - Banner subtitle
 * @property {string} description - Banner description
 * @property {string} imageUrl - Banner image URL
 * @property {string} [mobileImageUrl] - Mobile-optimized image URL
 * @property {string} linkUrl - Link URL when banner is clicked
 * @property {string} [linkText] - Call-to-action button text
 * @property {string} position - Banner position (home, category, product, etc.)
 * @property {number} sortOrder - Display order
 * @property {boolean} isActive - Whether banner is active
 * @property {Date} [startDate] - Start date for display
 * @property {Date} [endDate] - End date for display
 * @property {string[]} [targetAudiences] - Target audience segments
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

/**
 * @typedef {Object} IBannerListResponse
 * @property {IBannerResponse[]} banners - Array of banners
 * @property {number} total - Total number of banners
 * @property {number} page - Current page
 * @property {number} pageSize - Items per page
 * @property {number} totalPages - Total pages
 */

module.exports = { 
  IBannerResponse: {},
  IBannerListResponse: {}
};

