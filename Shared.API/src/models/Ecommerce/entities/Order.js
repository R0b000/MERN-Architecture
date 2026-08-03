/**
 * Order entity for e-commerce
 */

/**
 * @typedef {Object} IOrderItem
 * @property {string} productId - Product ID
 * @property {string} productName - Product name
 * @property {number} quantity - Quantity ordered
 * @property {number} price - Price at time of order
 * @property {string} image - Product image URL
 */

/**
 * @typedef {Object} IShippingAddress
 * @property {string} fullName - Full name
 * @property {string} street - Street address
 * @property {string} city - City
 * @property {string} state - State/Province
 * @property {string} postalCode - Postal/ZIP code
 * @property {string} country - Country
 * @property {string} phone - Phone number
 */

/**
 * @typedef {Object} IOrder
 * @property {string} [_id] - MongoDB ObjectId
 * @property {string} userId - User ID
 * @property {IOrderItem[]} items - Order items
 * @property {number} subtotal - Subtotal amount
 * @property {number} tax - Tax amount
 * @property {number} shippingCost - Shipping cost
 * @property {number} discount - Discount amount
 * @property {number} total - Total amount
 * @property {string} status - Order status (pending, processing, shipped, delivered, cancelled)
 * @property {IShippingAddress} shippingAddress - Shipping address
 * @property {string} paymentMethod - Payment method
 * @property {string} [paymentId] - Payment transaction ID
 * @property {string} [trackingNumber] - Tracking number
 * @property {Date} [orderDate] - Order date
 * @property {Date} [shippedDate] - Shipped date
 * @property {Date} [deliveredDate] - Delivered date
 * @property {Date} [createdAt] - Creation timestamp
 * @property {Date} [updatedAt] - Last update timestamp
 */

module.exports = { IOrder: {}, IOrderItem: {}, IShippingAddress: {} };
