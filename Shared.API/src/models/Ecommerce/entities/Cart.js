/**
 * Cart entity for e-commerce
 */

/**
 * @typedef {Object} ICartItem
 * @property {string} productId - Product ID
 * @property {string} productName - Product name
 * @property {number} price - Product price
 * @property {number} quantity - Quantity in cart
 * @property {string} image - Product image URL
 * @property {number} [maxStock] - Maximum available stock
 */

/**
 * @typedef {Object} ICart
 * @property {string} [_id] - MongoDB ObjectId
 * @property {string} userId - User ID
 * @property {ICartItem[]} items - Cart items
 * @property {number} totalItems - Total number of items
 * @property {number} subtotal - Subtotal amount
 * @property {Date} [createdAt] - Creation timestamp
 * @property {Date} [updatedAt] - Last update timestamp
 */

module.exports = { ICart: {}, ICartItem: {} };
