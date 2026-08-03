const { CommentRepository } = require('../../repositories/implementations/CommentRepository');
const { Response } = require('../../../Shared.API/src/wrappers/Response');
const { Logger } = require('../../../Shared.API/src/utils/Logger');

/**
 * Implementation of Comment service
 */
class CommentService {
  constructor() {
    this.commentRepository = new CommentRepository();
  }

  /**
   * Create a new comment
   * @param {Object} request - Comment request
   * @param {Object} user - Authenticated user
   * @returns {Promise<Object>}
   */
  async createComment(request, user) {
    try {
      const commentData = {
        ...request,
        userId: user.id,
        userName: user.name || user.email,
        userAvatar: user.avatar || ''
      };

      // TODO: Check if user purchased the product to set isVerifiedPurchase

      const comment = await this.commentRepository.create(commentData);
      
      Logger.info('Comment created', { commentId: comment._id, productId: request.productId });
      
      return Response.Success(comment, 'Comment created successfully', 201);
    } catch (error) {
      Logger.error('Failed to create comment', error);
      return Response.Fail('An error occurred while creating the comment');
    }
  }

  /**
   * Get comments for a product
   * @param {Object} filter - Filter options
   * @returns {Promise<Object>}
   */
  async getProductComments(filter) {
    try {
      const result = await this.commentRepository.findByProductId(filter);
      
      return Response.Success({
        comments: result.comments,
        total: result.total,
        averageRating: result.averageRating,
        page: filter.page || 1,
        pageSize: filter.pageSize || 10,
        totalPages: Math.ceil(result.total / (filter.pageSize || 10))
      }, 'Comments retrieved successfully');
    } catch (error) {
      Logger.error('Failed to get product comments', error);
      return Response.Fail('An error occurred while retrieving comments');
    }
  }

  /**
   * Update a comment
   * @param {string} id - Comment ID
   * @param {Object} request - Updated comment data
   * @param {Object} user - Authenticated user
   * @returns {Promise<Object>}
   */
  async updateComment(id, request, user) {
    try {
      const existingComment = await this.commentRepository.findById(id);
      
      if (!existingComment) {
        return Response.Fail('Comment not found', 404);
      }

      // Check if user owns the comment or is admin
      if (existingComment.userId !== user.id && user.role !== 'admin') {
        return Response.Fail('You can only update your own comments', 403);
      }

      const comment = await this.commentRepository.update(id, request);
      
      Logger.info('Comment updated', { commentId: id });
      
      return Response.Success(comment, 'Comment updated successfully');
    } catch (error) {
      Logger.error('Failed to update comment', error);
      return Response.Fail('An error occurred while updating the comment');
    }
  }

  /**
   * Delete a comment
   * @param {string} id - Comment ID
   * @param {Object} user - Authenticated user
   * @returns {Promise<Object>}
   */
  async deleteComment(id, user) {
    try {
      const existingComment = await this.commentRepository.findById(id);
      
      if (!existingComment) {
        return Response.Fail('Comment not found', 404);
      }

      // Check if user owns the comment or is admin
      if (existingComment.userId !== user.id && user.role !== 'admin') {
        return Response.Fail('You can only delete your own comments', 403);
      }

      const deleted = await this.commentRepository.delete(id);
      
      if (deleted) {
        Logger.info('Comment deleted', { commentId: id });
        return Response.Success(null, 'Comment deleted successfully');
      } else {
        return Response.Fail('Failed to delete comment');
      }
    } catch (error) {
      Logger.error('Failed to delete comment', error);
      return Response.Fail('An error occurred while deleting the comment');
    }
  }

  /**
   * Mark comment as helpful
   * @param {string} id - Comment ID
   * @returns {Promise<Object>}
   */
  async markCommentAsHelpful(id) {
    try {
      const comment = await this.commentRepository.markAsHelpful(id);
      
      if (comment) {
        return Response.Success({ helpfulCount: comment.helpfulCount }, 'Thank you for your feedback');
      } else {
        return Response.Fail('Comment not found', 404);
      }
    } catch (error) {
      Logger.error('Failed to mark comment as helpful', error);
      return Response.Fail('An error occurred while marking the comment as helpful');
    }
  }

  /**
   * Approve or reject a comment (admin)
   * @param {string} id - Comment ID
   * @param {boolean} isActive - Active status
   * @returns {Promise<Object>}
   */
  async setCommentApprovalStatus(id, isActive) {
    try {
      const comment = await this.commentRepository.setApprovalStatus(id, isActive);
      
      if (comment) {
        Logger.info('Comment approval status updated', { commentId: id, isActive });
        return Response.Success(comment, `Comment ${isActive ? 'approved' : 'rejected'} successfully`);
      } else {
        return Response.Fail('Comment not found', 404);
      }
    } catch (error) {
      Logger.error('Failed to set comment approval status', error);
      return Response.Fail('An error occurred while updating the comment status');
    }
  }

  /**
   * Get all comments (admin)
   * @param {Object} filter - Filter options
   * @param {number} page - Page number
   * @param {number} pageSize - Items per page
   * @returns {Promise<Object>}
   */
  async getAllComments(filter, page, pageSize) {
    try {
      const result = await this.commentRepository.findAll(filter, page, pageSize);
      
      return Response.Success({
        comments: result.comments,
        total: result.total,
        page: page || 1,
        pageSize: pageSize || 10,
        totalPages: Math.ceil(result.total / (pageSize || 10))
      }, 'Comments retrieved successfully');
    } catch (error) {
      Logger.error('Failed to get all comments', error);
      return Response.Fail('An error occurred while retrieving comments');
    }
  }
}

module.exports = { CommentService };

