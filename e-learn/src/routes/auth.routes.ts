import express from 'express';
import { registerUser, loginUser } from '../controllers/user.auth.controller';
import { apiLimit } from '../middlewares/rateLimiter';

const router = express.Router();

router.post('/register', apiLimit, registerUser);
router.post('/login',apiLimit,  loginUser);

export default router;

