/**
 * Interface for Comment repository
 */

/**
 * @typedef {import('../../../Shared.API/src/models/Ecommerce/entities/Comment').IComment} IComment
 * @typedef {import('../../../Shared.API/src/models/Ecommerce/requests/CommentRequests').ICreateCommentRequest} ICreateCommentRequest
 * @typedef {import('../../../Shared.API/src/models/Ecommerce/requests/CommentRequests').IUpdateCommentRequest} IUpdateCommentRequest
 * @typedef {import('../../../Shared.API/src/models/Ecommerce/requests/CommentRequests').ICommentFilterRequest} ICommentFilterRequest
 */

class ICommentRepository {
  /**
   * Create a new comment
   * @param {ICreateCommentRequest} commentData - Comment data
   * @returns {Promise<IComment>}
   */
  async create(commentData) {
    throw new Error('Method not implemented');
  }

  /**
   * Find comment by ID
   * @param {string} id - Comment ID
   * @returns {Promise<IComment | null>}
   */
  async findById(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Get comments for a product with pagination and filtering
   * @param {ICommentFilterRequest} filter - Filter options
   * @returns {Promise<{comments: IComment[], total: number, averageRating: number}>}
   */
  async findByProductId(filter) {
    throw new Error('Method not implemented');
  }

  /**
   * Update a comment
   * @param {string} id - Comment ID
   * @param {IUpdateCommentRequest} commentData - Updated comment data
   * @returns {Promise<IComment | null>}
   */
  async update(id, commentData) {
    throw new Error('Method not implemented');
  }

  /**
   * Delete a comment
   * @param {string} id - Comment ID
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Mark comment as helpful
   * @param {string} id - Comment ID
   * @returns {Promise<IComment | null>}
   */
  async markAsHelpful(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Approve or reject a comment (admin)
   * @param {string} id - Comment ID
   * @param {boolean} isActive - Active status
   * @returns {Promise<IComment | null>}
   */
  async setApprovalStatus(id, isActive) {
    throw new Error('Method not implemented');
  }

  /**
   * Get all comments with admin filters
   * @param {Object} filter - Admin filter options
   * @param {number} page - Page number
   * @param {number} pageSize - Items per page
   * @returns {Promise<{comments: IComment[], total: number}>}
   */
  async findAll(filter, page, pageSize) {
    throw new Error('Method not implemented');
  }
}

module.exports = { ICommentRepository };

