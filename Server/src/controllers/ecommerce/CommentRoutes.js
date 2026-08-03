const express = require('express');
const { CommentController } = require('./CommentController');
const { authMiddleware } = require('../../middleware/authMiddleware');

const router = express.Router();
const commentController = new CommentController();

/**
 * Public routes
 */
// Get comments for a product
router.get('/product/:productId', (req, res) => commentController.getProductComments(req, res));

// Mark comment as helpful
router.post('/:id/helpful', (req, res) => commentController.markCommentAsHelpful(req, res));

/**
 * Protected routes (require authentication)
 */
// Create a new comment
router.post('/', authMiddleware, (req, res) => commentController.createComment(req, res));

// Update a comment
router.put('/:id', authMiddleware, (req, res) => commentController.updateComment(req, res));

// Delete a comment
router.delete('/:id', authMiddleware, (req, res) => commentController.deleteComment(req, res));

/**
 * Admin routes
 */
// Get all comments (admin)
router.get('/admin/all', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      messages: ['Access denied. Admin privileges required.']
    });
  }
  commentController.getAllComments(req, res);
});

// Approve or reject a comment (admin)
router.put('/admin/:id/approve', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      messages: ['Access denied. Admin privileges required.']
    });
  }
  commentController.setCommentApprovalStatus(req, res);
});

module.exports = router;

