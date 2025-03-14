// routes/admin.routes.ts
import express from 'express';
import { restrictToAdmin} from '../middlewares/admin.middleware';

const router = express.Router();

router.get('/users', restrictToAdmin, (req, res) => {
  // Logic to list all users
});

router.patch('/users/:id/role', restrictToAdmin, (req, res) => {
  // Logic to update a user's role
});

export default router;