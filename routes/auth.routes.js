import { Router } from "express";
import { signup, signIn, signOut } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post('/sign-up', signup)
authRouter.post('/sign-in', signIn)
authRouter.post('/sign-out', signOut)

export default authRouter;


