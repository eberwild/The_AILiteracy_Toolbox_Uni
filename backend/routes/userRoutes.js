import express from 'express';
import { createUser , loginUser, requestResetEmail , changePassword} from '../controller/userController.js';
import { loginLimiter , registerLimiter , resetLimiter , passwordChangeLimiter} from '../middleware/limiter.js';

const userRouter = express.Router();

userRouter.post('/register' , registerLimiter , createUser);
userRouter.post('/login' , loginLimiter , loginUser);
userRouter.post('/reset-request' , resetLimiter , requestResetEmail);
userRouter.post('/password-change' , passwordChangeLimiter ,  changePassword);

export default userRouter;