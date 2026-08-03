const Comment = require('../../models/ecommerce/Comment.model');

/**
 * Implementation of Comment repository
 */
class CommentRepository {
  /**
   * Create a new comment
   * @param {Object} commentData - Comment data
   * @returns {Promise<Object>}
   */
  async create(commentData) {
    const comment = await Comment.create({
      ...commentData,
      isVerifiedPurchase: false,
      helpfulCount: 0,
      isActive: true
    });
    return comment.toObject();
  }

  /**
   * Find comment by ID
   * @param {string} id - Comment ID
   * @returns {Promise<Object | null>}
   */
  async findById(id) {
    const comment = await Comment.findById(id).exec();
    return comment ? comment.toObject() : null;
  }

  /**
   * Get comments for a product with pagination and filtering
   * @param {Object} filter - Filter options
   * @returns {Promise<{comments: Object[], total: number, averageRating: number}>}
   */
  async findByProductId(filter) {
    const {
      productId,
      page = 1,
      pageSize = 10,
      minRating,
      verifiedOnly,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = filter;

    const query = { productId, isActive: true };

    if (minRating) {
      query.rating = { $gte: minRating };
    }

    if (verifiedOnly) {
      query.isVerifiedPurchase = true;
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const skip = (page - 1) * pageSize;

    const [comments, total] = await Promise.all([
      Comment.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(pageSize)
        .lean(),
      Comment.countDocuments(query)
    ]);

    // Calculate average rating
    const ratingStats = await Comment.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$productId',
          averageRating: { $avg: '$rating' }
        }
      }
    ]);

    const averageRating = ratingStats.length > 0 ? ratingStats[0].averageRating : 0;

    return {
      comments,
      total,
      averageRating: Math.round(averageRating * 10) / 10
    };
  }

  /**
   * Update a comment
   * @param {string} id - Comment ID
   * @param {Object} commentData - Updated comment data
   * @returns {Promise<Object | null>}
   */
  async update(id, commentData) {
    const comment = await Comment.findByIdAndUpdate(
      id,
      { $set: commentData },
      { new: true, runValidators: true }
    ).exec();
    return comment ? comment.toObject() : null;
  }

  /**
   * Delete a comment
   * @param {string} id - Comment ID
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    const result = await Comment.findByIdAndDelete(id).exec();
    return !!result;
  }

  /**
   * Mark comment as helpful
   * @param {string} id - Comment ID
   * @returns {Promise<Object | null>}
   */
  async markAsHelpful(id) {
    const comment = await Comment.findByIdAndUpdate(
      id,
      { $inc: { helpfulCount: 1 } },
      { new: true }
    ).exec();
    return comment ? comment.toObject() : null;
  }

  /**
   * Approve or reject a comment (admin)
   * @param {string} id - Comment ID
   * @param {boolean} isActive - Active status
   * @returns {Promise<Object | null>}
   */
  async setApprovalStatus(id, isActive) {
    const comment = await Comment.findByIdAndUpdate(
      id,
      { $set: { isActive } },
      { new: true }
    ).exec();
    return comment ? comment.toObject() : null;
  }

  /**
   * Get all comments with admin filters
   * @param {Object} filter - Admin filter options
   * @param {number} page - Page number
   * @param {number} pageSize - Items per page
   * @returns {Promise<{comments: Object[], total: number}>}
   */
  async findAll(filter, page, pageSize) {
    const { productId, userId, isActive, minRating } = filter || {};
    const query = {};

    if (productId) query.productId = productId;
    if (userId) query.userId = userId;
    if (isActive !== undefined) query.isActive = isActive;
    if (minRating) query.rating = { $gte: minRating };

    const skip = (page - 1) * pageSize;

    const [comments, total] = await Promise.all([
      Comment.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize)
        .lean(),
      Comment.countDocuments(query)
    ]);

    return { comments, total };
  }
}

module.exports = { CommentRepository };

