import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/auth.controller';
const router = express.Router();
// Registration route
router.post('/signup', registerUser);
// Login route
router.post('/login', loginUser);
router.post('/logout', logoutUser);
export default router;
