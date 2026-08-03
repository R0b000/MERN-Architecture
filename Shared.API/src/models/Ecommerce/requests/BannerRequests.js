/**
 * Banner requests for promotional content management
 */

/**
 * @typedef {Object} ICreateBannerRequest
 * @property {string} title - Banner title
 * @property {string} subtitle - Banner subtitle
 * @property {string} description - Banner description
 * @property {string} imageUrl - Banner image URL
 * @property {string} [mobileImageUrl] - Mobile-optimized image URL
 * @property {string} linkUrl - Link URL when banner is clicked
 * @property {string} [linkText] - Call-to-action button text
 * @property {string} position - Banner position (home, category, product, etc.)
 * @property {number} sortOrder - Display order
 * @property {Date} [startDate] - Start date for display
 * @property {Date} [endDate] - End date for display
 * @property {string[]} [targetAudiences] - Target audience segments
 */

/**
 * @typedef {Object} IUpdateBannerRequest
 * @property {string} [title] - Updated title
 * @property {string} [subtitle] - Updated subtitle
 * @property {string} [description] - Updated description
 * @property {string} [imageUrl] - Updated image URL
 * @property {string} [mobileImageUrl] - Updated mobile image URL
 * @property {string} [linkUrl] - Updated link URL
 * @property {string} [linkText] - Updated button text
 * @property {string} [position] - Updated position
 * @property {number} [sortOrder] - Updated sort order
 * @property {boolean} [isActive] - Updated active status
 * @property {Date} [startDate] - Updated start date
 * @property {Date} [endDate] - Updated end date
 * @property {string[]} [targetAudiences] - Updated target audiences
 */

/**
 * @typedef {Object} IBannerFilterRequest
 * @property {string} [position] - Filter by position
 * @property {boolean} [isActive] - Filter by active status
 * @property {number} [page] - Page number
 * @property {number} [pageSize] - Items per page
 */

module.exports = { 
  ICreateBannerRequest: {},
  IUpdateBannerRequest: {},
  IBannerFilterRequest: {}
};

