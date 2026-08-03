/**
 * Order request models
 */

/**
 * @typedef {Object} ICreateOrderRequest
 * @property {string} [paymentMethod='card'] - Payment method (card, paypal, cod)
 * @property {IShippingAddressRequest} shippingAddress - Shipping address
 * @property {string} [couponCode] - Coupon code for discount
 */

/**
 * @typedef {Object} IShippingAddressRequest
 * @property {string} fullName - Full name
 * @property {string} street - Street address
 * @property {string} city - City
 * @property {string} state - State/Province
 * @property {string} postalCode - Postal/ZIP code
 * @property {string} country - Country
 * @property {string} phone - Phone number
 */

/**
 * @typedef {Object} IGetOrdersRequest
 * @property {string} [status] - Filter by status
 * @property {number} [page=1] - Page number
 * @property {number} [limit=20] - Items per page
 * @property {string} [sortBy='createdAt'] - Sort field
 * @property {'asc'|'desc'} [sortOrder='desc'] - Sort order
 */

module.exports = { 
  ICreateOrderRequest: {}, 
  IShippingAddressRequest: {},
  IGetOrdersRequest: {} 
};
