const { Router } = require('express');
const { AuthService } = require('../../services/implementation/AuthService');
const { authMiddleware } = require('../../middleware/authMiddleware');

const router = Router();
const authService = new AuthService();

router.post('/login', async (req, res) => {
  try {
    const loginData = req.body;
    const response = await authService.login(loginData);

    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(401).json(response);
    }
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
    const registerData = req.body;
    const response = await authService.register(registerData);

    if (response.success) {
      res.status(201).json(response);
    } else {
      res.status(400).json(response);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      messages: ['Registration failed'],
      errors: [error.message],
    });
  }
});

router.get('/profile', async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        messages: ['Unauthorized'],
      });
      return;
    }

    const response = await authService.getUserProfile(req.user.id);

    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(404).json(response);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      messages: ['Failed to get profile'],
      errors: [error.message],
    });
  }
});

module.exports = router;