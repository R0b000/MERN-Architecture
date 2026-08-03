/**
 * Product entity for e-commerce
 */

/**
 * @typedef {Object} IProduct
 * @property {string} [_id] - MongoDB ObjectId
 * @property {string} name - Product name
 * @property {string} description - Product description
 * @property {number} price - Current price
 * @property {number} [originalPrice] - Original price before discount
 * @property {string} currency - Currency code (USD, EUR, etc.)
 * @property {string} category - Product category
 * @property {string} [subcategory] - Product subcategory
 * @property {string} brand - Brand name
 * @property {string} sku - Stock keeping unit
 * @property {number} stock - Available stock quantity
 * @property {string[]} images - Array of image URLs
 * @property {string} [thumbnail] - Thumbnail image URL
 * @property {number} [rating] - Average rating (0-5)
 * @property {number} [reviewCount] - Number of reviews
 * @property {string[]} [tags] - Product tags
 * @property {Record<string, string>} [specifications] - Product specifications
 * @property {boolean} isActive - Whether product is active
 * @property {boolean} [isFeatured] - Whether product is featured
 * @property {Date} [createdAt] - Creation timestamp
 * @property {Date} [updatedAt] - Last update timestamp
 */

module.exports = { IProduct: {} };
