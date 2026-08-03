const { Response } = require('../../../Shared.API/src/wrappers/Response');
const { Logger } = require('../../../Shared.API/src/utils/Logger');

/**
 * Interface for Comment service
 */

class ICommentService {
  /**
   * Create a new comment
   * @param {Object} request - Comment request
   * @param {Object} user - Authenticated user
   * @returns {Promise<Object>}
   */
  async createComment(request, user) {
    throw new Error('Method not implemented');
  }

  /**
   * Get comments for a product
   * @param {Object} filter - Filter options
   * @returns {Promise<Object>}
   */
  async getProductComments(filter) {
    throw new Error('Method not implemented');
  }

  /**
   * Update a comment
   * @param {string} id - Comment ID
   * @param {Object} request - Updated comment data
   * @param {Object} user - Authenticated user
   * @returns {Promise<Object>}
   */
  async updateComment(id, request, user) {
    throw new Error('Method not implemented');
  }

  /**
   * Delete a comment
   * @param {string} id - Comment ID
   * @param {Object} user - Authenticated user
   * @returns {Promise<Object>}
   */
  async deleteComment(id, user) {
    throw new Error('Method not implemented');
  }

  /**
   * Mark comment as helpful
   * @param {string} id - Comment ID
   * @returns {Promise<Object>}
   */
  async markCommentAsHelpful(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Approve or reject a comment (admin)
   * @param {string} id - Comment ID
   * @param {boolean} isActive - Active status
   * @returns {Promise<Object>}
   */
  async setCommentApprovalStatus(id, isActive) {
    throw new Error('Method not implemented');
  }

  /**
   * Get all comments (admin)
   * @param {Object} filter - Filter options
   * @param {number} page - Page number
   * @param {number} pageSize - Items per page
   * @returns {Promise<Object>}
   */
  async getAllComments(filter, page, pageSize) {
    throw new Error('Method not implemented');
  }
}

module.exports = { ICommentService };

