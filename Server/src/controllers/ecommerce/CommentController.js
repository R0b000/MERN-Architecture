const { CommentService } = require('../../services/implementations/CommentService');

/**
 * Controller for handling comment-related requests
 */
class CommentController {
  constructor() {
    this.commentService = new CommentService();
  }

  /**
   * Create a new comment
   * POST /api/comments
   */
  async createComment(req, res) {
    try {
      const response = await this.commentService.createComment(req.body, req.user);
      res.status(response.statusCode || 201).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        messages: ['An error occurred while processing the request']
      });
    }
  }

  /**
   * Get comments for a product
   * GET /api/comments/product/:productId
   */
  async getProductComments(req, res) {
    try {
      const filter = {
        productId: req.params.productId,
        page: parseInt(req.query.page) || 1,
        pageSize: parseInt(req.query.pageSize) || 10,
        minRating: req.query.minRating ? parseInt(req.query.minRating) : undefined,
        verifiedOnly: req.query.verifiedOnly === 'true',
        sortBy: req.query.sortBy || 'createdAt',
        sortOrder: req.query.sortOrder || 'desc'
      };

      const response = await this.commentService.getProductComments(filter);
      res.status(response.statusCode || 200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        messages: ['An error occurred while processing the request']
      });
    }
  }

  /**
   * Update a comment
   * PUT /api/comments/:id
   */
  async updateComment(req, res) {
    try {
      const response = await this.commentService.updateComment(req.params.id, req.body, req.user);
      res.status(response.statusCode || 200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        messages: ['An error occurred while processing the request']
      });
    }
  }

  /**
   * Delete a comment
   * DELETE /api/comments/:id
   */
  async deleteComment(req, res) {
    try {
      const response = await this.commentService.deleteComment(req.params.id, req.user);
      res.status(response.statusCode || 200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        messages: ['An error occurred while processing the request']
      });
    }
  }

  /**
   * Mark comment as helpful
   * POST /api/comments/:id/helpful
   */
  async markCommentAsHelpful(req, res) {
    try {
      const response = await this.commentService.markCommentAsHelpful(req.params.id);
      res.status(response.statusCode || 200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        messages: ['An error occurred while processing the request']
      });
    }
  }

  /**
   * Get all comments (admin)
   * GET /api/admin/comments
   */
  async getAllComments(req, res) {
    try {
      const filter = {
        productId: req.query.productId,
        userId: req.query.userId,
        isActive: req.query.isActive !== undefined ? req.query.isActive === 'true' : undefined,
        minRating: req.query.minRating ? parseInt(req.query.minRating) : undefined
      };
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;

      const response = await this.commentService.getAllComments(filter, page, pageSize);
      res.status(response.statusCode || 200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        messages: ['An error occurred while processing the request']
      });
    }
  }

  /**
   * Approve or reject a comment (admin)
   * PUT /api/admin/comments/:id/approve
   */
  async setCommentApprovalStatus(req, res) {
    try {
      const { isActive } = req.body;
      const response = await this.commentService.setCommentApprovalStatus(req.params.id, isActive);
      res.status(response.statusCode || 200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        messages: ['An error occurred while processing the request']
      });
    }
  }
}

module.exports = { CommentController };

