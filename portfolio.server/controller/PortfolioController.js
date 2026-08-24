const { Router } = require('express');
const { PortfolioService } = require('../services/PortfolioService');

const router = Router();
const portfolioService = new PortfolioService();

router.get('/', async (req, res) => {
  try {
    const response = await portfolioService.getPortfolioData();
    res.status(response.statusCode || 200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      messages: ['Failed to fetch portfolio data'],
      errors: [error.message],
    });
  }
});

router.put('/', async (req, res) => {
  try {
    const response = await portfolioService.updatePortfolioData(req.body);
    res.status(response.statusCode || 200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      messages: ['Failed to update portfolio data'],
      errors: [error.message],
    });
  }
});

const portfolioRouter = router;

module.exports = { portfolioRouter, router };
