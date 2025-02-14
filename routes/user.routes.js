import { Router } from "express";
import { getUsers, getUserById } from "../controllers/user.controller.js";
import autherize from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get('/', getUsers)

userRouter.get('/:id',autherize, getUserById)

userRouter.post('/', (req, res) => res.send({title: 'create a new user'}))

userRouter.put('/:id', (req, res) => res.send({title: 'update user details'}))

userRouter.delete('/:id', (req, res) => res.send({title: 'delete a user'}))

export default userRouter;
