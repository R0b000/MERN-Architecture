const mongoose = require('mongoose');

/**
 * Banner schema for promotional content
 */
const BannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  mobileImageUrl: {
    type: String,
    default: ''
  },
  linkUrl: {
    type: String,
    required: true
  },
  linkText: {
    type: String,
    default: 'Shop Now'
  },
  position: {
    type: String,
    required: true,
    index: true,
    enum: ['home', 'category', 'product', 'checkout', 'sidebar']
  },
  sortOrder: {
    type: Number,
    default: 0,
    index: true
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  startDate: {
    type: Date,
    default: null
  },
  endDate: {
    type: Date,
    default: null
  },
  targetAudiences: [{
    type: String
  }]
}, {
  timestamps: true
});

// Index for active banners by position and sort order
BannerSchema.index({ position: 1, isActive: 1, sortOrder: 1 });
BannerSchema.index({ isActive: 1, startDate: 1, endDate: 1 });

module.exports = mongoose.model('Banner', BannerSchema);

