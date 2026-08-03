/**
 * Comment requests for e-commerce reviews
 */

/**
 * @typedef {Object} ICreateCommentRequest
 * @property {string} productId - Product ID being reviewed
 * @property {number} rating - Rating (1-5)
 * @property {string} title - Comment title
 * @property {string} content - Comment content
 * @property {string[]} [images] - Array of image URLs
 * @property {string} [parentCommentId] - Parent comment ID for replies
 */

/**
 * @typedef {Object} IUpdateCommentRequest
 * @property {number} [rating] - Updated rating
 * @property {string} [title] - Updated title
 * @property {string} [content] - Updated content
 * @property {string[]} [images] - Updated images
 */

/**
 * @typedef {Object} ICommentFilterRequest
 * @property {string} productId - Product ID to filter comments
 * @property {number} [page] - Page number
 * @property {number} [pageSize] - Items per page
 * @property {number} [minRating] - Minimum rating filter
 * @property {boolean} [verifiedOnly] - Only verified purchases
 * @property {string} [sortBy] - Sort field (createdAt, rating, helpfulCount)
 * @property {string} [sortOrder] - Sort order (asc, desc)
 */

module.exports = { 
  ICreateCommentRequest: {},
  IUpdateCommentRequest: {},
  ICommentFilterRequest: {}
};

