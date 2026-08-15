const { Router } = require('express');
const { AuthService } = require('../services/implementations/AuthService');
const { authMiddleware } = require('../middleware/AuthMiddleware');

const router = Router();
const authService = new AuthService();

router.post('/login', async (req, res) => {
  try {
    const response = await authService.login(req.body);
    res.status(response.statusCode || (response.success ? 200 : 401)).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      messages: ['Login failed'],
      errors: [error.message],
    });
  }
});

router.post('/register', async (req, res) => {
  try {
    const response = await authService.register(req.body);
    res.status(response.statusCode || (response.success ? 201 : 400)).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      messages: ['Registration failed'],
      errors: [error.message],
    });
  }
});

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const response = await authService.getUserProfile(req.user.id);
    res.status(response.statusCode || (response.success ? 200 : 404)).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      messages: ['Failed to get profile'],
      errors: [error.message],
    });
  }
});

router.post('/change-password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const response = await authService.changePassword(req.user.id, currentPassword, newPassword);
    res.status(response.statusCode || 200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      messages: ['Failed to change password'],
      errors: [error.message],
    });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const response = await authService.forgotPassword(email);
    res.status(response.statusCode || 200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      messages: ['Failed to process request'],
      errors: [error.message],
    });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const response = await authService.resetPassword(token, newPassword);
    res.status(response.statusCode || (response.success ? 200 : 400)).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      messages: ['Failed to reset password'],
      errors: [error.message],
    });
  }
});

const authRouter = router;

module.exports = { authRouter, router };
