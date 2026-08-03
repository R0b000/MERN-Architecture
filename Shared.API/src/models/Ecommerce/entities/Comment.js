/**
 * Comment entity for product reviews
 */

/**
 * @typedef {Object} IComment
 * @property {string} [_id] - MongoDB ObjectId
 * @property {string} productId - Product ID being reviewed
 * @property {string} userId - User who wrote the comment
 * @property {string} userName - User name for display
 * @property {string} userAvatar - User avatar URL
 * @property {number} rating - Rating (1-5)
 * @property {string} title - Comment title
 * @property {string} content - Comment content
 * @property {string[]} [images] - Array of image URLs
 * @property {boolean} isVerifiedPurchase - Whether user purchased the product
 * @property {number} helpfulCount - Number of helpful votes
 * @property {string} [parentCommentId] - Parent comment ID for replies
 * @property {IComment[]} [replies] - Nested replies
 * @property {boolean} isActive - Whether comment is active/approved
 * @property {Date} [createdAt] - Creation timestamp
 * @property {Date} [updatedAt] - Last update timestamp
 */

module.exports = { IComment: {} };

