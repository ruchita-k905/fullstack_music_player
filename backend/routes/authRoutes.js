import express from 'express';
import {
  forgotPassword,
  signup,
  login,
  protect,
  getMe,
  resetPassword,
  editProfile,
} from '../controllers/authController.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.patch('/profile', protect, editProfile);

export default router;
