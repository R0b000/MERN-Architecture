const { Router } = require('express');
const { PortfolioService } = require('../services/PortfolioService');
const { authMiddleware } = require('../../auth.server/middleware/AuthMiddleware');

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

router.put('/', authMiddleware, async (req, res) => {
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

router.post('/messages', async (req, res) => {
  try {
    const response = await portfolioService.saveMessage(req.body);
    res.status(response.statusCode || 201).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      messages: ['Failed to save message'],
      errors: [error.message],
    });
  }
});

router.get('/messages', authMiddleware, async (req, res) => {
  try {
    const response = await portfolioService.getMessages();
    res.status(response.statusCode || 200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      messages: ['Failed to fetch messages'],
      errors: [error.message],
    });
  }
});

router.post('/analytics/hire', async (req, res) => {
  try {
    const response = await portfolioService.incrementHireMeClicks();
    res.status(response.statusCode || 200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      messages: ['Failed to increment hire me clicks'],
      errors: [error.message],
    });
  }
});

router.post('/analytics/project', async (req, res) => {
  try {
    const response = await portfolioService.incrementProjectClicks();
    res.status(response.statusCode || 200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      messages: ['Failed to increment project clicks'],
      errors: [error.message],
    });
  }
});

router.put('/messages/:id/read', authMiddleware, async (req, res) => {
  try {
    const response = await portfolioService.markMessageAsRead(req.params.id);
    res.status(response.statusCode || 200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      messages: ['Failed to mark message as read'],
      errors: [error.message],
    });
  }
});

const portfolioRouter = router;

module.exports = { portfolioRouter, router };
