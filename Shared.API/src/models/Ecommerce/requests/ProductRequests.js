/**
 * Product request models
 */

/**
 * @typedef {Object} IGetProductsRequest
 * @property {string} [category] - Filter by category
 * @property {string} [subcategory] - Filter by subcategory
 * @property {string} [brand] - Filter by brand
 * @property {number} [minPrice] - Minimum price filter
 * @property {number} [maxPrice] - Maximum price filter
 * @property {number} [page=1] - Page number
 * @property {number} [limit=20] - Items per page
 * @property {string} [sortBy='createdAt'] - Sort field
 * @property {'asc'|'desc'} [sortOrder='desc'] - Sort order
 * @property {string} [search] - Search query
 * @property {string[]} [tags] - Filter by tags
 */

/**
 * @typedef {Object} ICreateProductRequest
 * @property {string} name - Product name
 * @property {string} description - Product description
 * @property {number} price - Product price
 * @property {number} [originalPrice] - Original price
 * @property {string} [currency='USD'] - Currency code
 * @property {string} category - Category
 * @property {string} [subcategory] - Subcategory
 * @property {string} brand - Brand
 * @property {string} sku - SKU
 * @property {number} stock - Stock quantity
 * @property {string[]} images - Image URLs
 * @property {string[]} [tags] - Tags
 * @property {Record<string, string>} [specifications] - Specifications
 * @property {boolean} [isFeatured=false] - Is featured product
 */

/**
 * @typedef {Object} IUpdateProductRequest
 * @property {string} id - Product ID
 * @property {string} [name] - Product name
 * @property {string} [description] - Product description
 * @property {number} [price] - Product price
 * @property {number} [originalPrice] - Original price
 * @property {string} [category] - Category
 * @property {string} [subcategory] - Subcategory
 * @property {string} [brand] - Brand
 * @property {number} [stock] - Stock quantity
 * @property {string[]} [images] - Image URLs
 * @property {boolean} [isActive] - Active status
 * @property {boolean} [isFeatured] - Featured status
 */

module.exports = { 
  IGetProductsRequest: {}, 
  ICreateProductRequest: {}, 
  IUpdateProductRequest: {} 
};
