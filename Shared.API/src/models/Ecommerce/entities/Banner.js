/**
 * Banner entity for promotional content
 */

/**
 * @typedef {Object} IBanner
 * @property {string} [_id] - MongoDB ObjectId
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
 * @property {Date} [createdAt] - Creation timestamp
 * @property {Date} [updatedAt] - Last update timestamp
 */

module.exports = { IBanner: {} };

