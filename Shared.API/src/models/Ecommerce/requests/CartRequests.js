/**
 * Cart request models
 */

/**
 * @typedef {Object} IAddToCartRequest
 * @property {string} productId - Product ID to add
 * @property {number} [quantity=1] - Quantity to add
 */

/**
 * @typedef {Object} IUpdateCartItemRequest
 * @property {string} productId - Product ID to update
 * @property {number} quantity - New quantity
 */

/**
 * @typedef {Object} IRemoveFromCartRequest
 * @property {string} productId - Product ID to remove
 */

module.exports = { 
  IAddToCartRequest: {}, 
  IUpdateCartItemRequest: {}, 
  IRemoveFromCartRequest: {} 
};
