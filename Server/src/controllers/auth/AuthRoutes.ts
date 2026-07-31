import { Router, Request, Response } from 'express';
import { AuthService } from '../../services/implementation/AuthService';
import { LoginRequest, RegisterRequest } from 'shared-api';
import { AuthRequest } from '../../middleware/authMiddleware';

const router = Router();
const authService = new AuthService();

/**
 * POST /api/auth/login
 * Authenticate user and return token
 */
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const loginData: LoginRequest = req.body;
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
      errors: [(error as Error).message],
    });
  }
});

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const registerData: RegisterRequest = req.body;
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
      errors: [(error as Error).message],
    });
  }
});

/**
 * GET /api/auth/profile
 * Get current user profile (protected route)
 */
router.get('/profile', async (req: AuthRequest, res: Response): Promise<void> => {
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
      errors: [(error as Error).message],
    });
  }
});

export default router;
