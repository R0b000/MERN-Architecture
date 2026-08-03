/**
 * Comment responses for e-commerce reviews
 */

/**
 * @typedef {Object} ICommentResponse
 * @property {string} _id - Comment ID
 * @property {string} productId - Product ID being reviewed
 * @property {string} userId - User who wrote the comment
 * @property {string} userName - User name for display
 * @property {string} userAvatar - User avatar URL
 * @property {number} rating - Rating (1-5)
 * @property {string} title - Comment title
 * @property {string} content - Comment content
 * @property {string[]} images - Array of image URLs
 * @property {boolean} isVerifiedPurchase - Whether user purchased the product
 * @property {number} helpfulCount - Number of helpful votes
 * @property {string} [parentCommentId] - Parent comment ID for replies
 * @property {ICommentResponse[]} [replies] - Nested replies
 * @property {boolean} isActive - Whether comment is active/approved
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

/**
 * @typedef {Object} ICommentListResponse
 * @property {ICommentResponse[]} comments - Array of comments
 * @property {number} total - Total number of comments
 * @property {number} page - Current page
 * @property {number} pageSize - Items per page
 * @property {number} totalPages - Total pages
 * @property {number} averageRating - Average rating for the product
 */

module.exports = { 
  ICommentResponse: {},
  ICommentListResponse: {}
};

