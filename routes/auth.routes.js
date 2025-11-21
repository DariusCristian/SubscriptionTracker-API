import { Router } from 'express';
import { signUp, signIn, signOut } from '../controllers/auth.controller.js';

const authRouter = Router();

// Path: /api/v1/auth/sign-up (Post)
authRouter.post('/sign-up', signUp);

// Path: /api/v1/auth/sign-in (Post)
authRouter.post('/sign-in', signIn);

// Path: /api/v1/auth/sign-out (Post)
authRouter.post('/sign-out', signOut);

export default authRouter;