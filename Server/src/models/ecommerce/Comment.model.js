const mongoose = require('mongoose');

/**
 * Comment schema for product reviews
 */
const CommentSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: String,
    required: true,
    index: true
  },
  userName: {
    type: String,
    required: true
  },
  userAvatar: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  images: [{
    type: String
  }],
  isVerifiedPurchase: {
    type: Boolean,
    default: false
  },
  helpfulCount: {
    type: Number,
    default: 0
  },
  parentCommentId: {
    type: String,
    default: null,
    index: true
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  }
}, {
  timestamps: true
});

// Index for sorting and filtering
CommentSchema.index({ productId: 1, createdAt: -1 });
CommentSchema.index({ productId: 1, rating: -1 });
CommentSchema.index({ userId: 1 });

module.exports = mongoose.model('Comment', CommentSchema);

