const { BannerService } = require('../../services/implementations/BannerService');

/**
 * Controller for handling banner-related requests
 */
class BannerController {
  constructor() {
    this.bannerService = new BannerService();
  }

  /**
   * Create a new banner (admin)
   * POST /api/admin/banners
   */
  async createBanner(req, res) {
    try {
      const response = await this.bannerService.createBanner(req.body);
      res.status(response.statusCode || 201).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        messages: ['An error occurred while processing the request']
      });
    }
  }

  /**
   * Get banner by ID
   * GET /api/banners/:id
   */
  async getBannerById(req, res) {
    try {
      const response = await this.bannerService.getBannerById(req.params.id);
      res.status(response.statusCode || 200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        messages: ['An error occurred while processing the request']
      });
    }
  }

  /**
   * Get active banners by position
   * GET /api/banners/position/:position
   */
  async getBannersByPosition(req, res) {
    try {
      const response = await this.bannerService.getBannersByPosition(req.params.position);
      res.status(response.statusCode || 200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        messages: ['An error occurred while processing the request']
      });
    }
  }

  /**
   * Update a banner (admin)
   * PUT /api/admin/banners/:id
   */
  async updateBanner(req, res) {
    try {
      const response = await this.bannerService.updateBanner(req.params.id, req.body);
      res.status(response.statusCode || 200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        messages: ['An error occurred while processing the request']
      });
    }
  }

  /**
   * Delete a banner (admin)
   * DELETE /api/admin/banners/:id
   */
  async deleteBanner(req, res) {
    try {
      const response = await this.bannerService.deleteBanner(req.params.id);
      res.status(response.statusCode || 200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        messages: ['An error occurred while processing the request']
      });
    }
  }

  /**
   * Toggle banner active status (admin)
   * PUT /api/admin/banners/:id/toggle
   */
  async toggleBannerStatus(req, res) {
    try {
      const { isActive } = req.body;
      const response = await this.bannerService.toggleBannerStatus(req.params.id, isActive);
      res.status(response.statusCode || 200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        messages: ['An error occurred while processing the request']
      });
    }
  }

  /**
   * Get all banners (admin)
   * GET /api/admin/banners
   */
  async getAllBanners(req, res) {
    try {
      const filter = {
        position: req.query.position,
        isActive: req.query.isActive !== undefined ? req.query.isActive === 'true' : undefined
      };
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;

      const response = await this.bannerService.getAllBanners(filter, page, pageSize);
      res.status(response.statusCode || 200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        messages: ['An error occurred while processing the request']
      });
    }
  }
}

module.exports = { BannerController };

