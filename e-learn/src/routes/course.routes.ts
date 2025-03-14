// routes/course.routes.ts
import express from 'express';
import { restrictToRoles } from '../middlewares/role.midlleware'

const router = express.Router();

router.post(
  '/create-course',
  restrictToRoles('teacher'),
  (req, res) => {
    // Teacher-only route logic
  }
);

export default router;