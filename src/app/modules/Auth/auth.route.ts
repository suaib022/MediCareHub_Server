import express from 'express';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router.post(
    '/login',
    AuthControllers.logInUser
);

router.post(
    '/refresh-token',
    AuthControllers.refreshToken
)

export const AuthRoutes = router;