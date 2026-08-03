/**
 * Product response models
 */

/**
 * @typedef {Object} IProductResponse
 * @property {string} _id - Product ID
 * @property {string} name - Product name
 * @property {string} description - Product description
 * @property {number} price - Current price
 * @property {number} [originalPrice] - Original price
 * @property {string} currency - Currency code
 * @property {string} category - Category
 * @property {string} [subcategory] - Subcategory
 * @property {string} brand - Brand
 * @property {string} sku - SKU
 * @property {number} stock - Stock quantity
 * @property {string[]} images - Image URLs
 * @property {string} [thumbnail] - Thumbnail URL
 * @property {number} [rating=0] - Average rating
 * @property {number} [reviewCount=0] - Review count
 * @property {string[]} [tags] - Tags
 * @property {Record<string, string>} [specifications] - Specifications
 * @property {boolean} isActive - Active status
 * @property {boolean} [isFeatured=false] - Featured status
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

/**
 * @typedef {Object} IProductsListResponse
 * @property {IProductResponse[]} products - Array of products
 * @property {number} total - Total number of products
 * @property {number} page - Current page
 * @property {number} totalPages - Total pages
 * @property {number} limit - Items per page
 */

module.exports = { IProductResponse: {}, IProductsListResponse: {} };
