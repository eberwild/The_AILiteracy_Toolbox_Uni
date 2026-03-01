import express from 'express';
import { fetchallTools , provideNewTool } from '../controller/toolController.js';
import { submissionLimiter } from '../middleware/limiter.js';
import { verifyToken } from '../middleware/auth.js';

const toolRouter = express.Router();

toolRouter.get('/' , fetchallTools);
toolRouter.post('/', submissionLimiter , verifyToken , provideNewTool);

export default toolRouter;