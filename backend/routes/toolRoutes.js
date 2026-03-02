import express from 'express';
import { fetchallTools , provideNewTool } from '../controller/toolController.js';
import { submissionLimiter } from '../middleware/limiter.js';

const toolRouter = express.Router();

toolRouter.get('/' , fetchallTools);
toolRouter.post('/', submissionLimiter  , provideNewTool);

export default toolRouter;