const express = require('express');
const { BannerController } = require('./BannerController');
const { authMiddleware } = require('../../middleware/authMiddleware');

const router = express.Router();
const bannerController = new BannerController();

/**
 * Public routes
 */
// Get banner by ID
router.get('/:id', (req, res) => bannerController.getBannerById(req, res));

// Get active banners by position
router.get('/position/:position', (req, res) => bannerController.getBannersByPosition(req, res));

/**
 * Admin routes
 */
// Create a new banner
router.post('/', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      messages: ['Access denied. Admin privileges required.']
    });
  }
  bannerController.createBanner(req, res);
});

// Update a banner
router.put('/:id', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      messages: ['Access denied. Admin privileges required.']
    });
  }
  bannerController.updateBanner(req, res);
});

// Delete a banner
router.delete('/:id', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      messages: ['Access denied. Admin privileges required.']
    });
  }
  bannerController.deleteBanner(req, res);
});

// Toggle banner active status
router.put('/:id/toggle', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      messages: ['Access denied. Admin privileges required.']
    });
  }
  bannerController.toggleBannerStatus(req, res);
});

// Get all banners
router.get('/admin/all', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      messages: ['Access denied. Admin privileges required.']
    });
  }
  bannerController.getAllBanners(req, res);
});

module.exports = router;

