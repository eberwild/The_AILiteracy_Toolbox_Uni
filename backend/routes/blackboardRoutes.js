import express from 'express';
import { fetchAllEntries , postEntry , removeEntry} from '../controller/blackboardController.js';
import { globalLimiter , blackBoardLimiter , deleteBlackboardLimiter} from '../middleware/limiter.js';
import { verifyToken } from '../middleware/auth.js';

const blackboardRouter = express.Router();

blackboardRouter.get("/", globalLimiter , fetchAllEntries);
blackboardRouter.post("/" ,blackBoardLimiter , verifyToken , postEntry);
blackboardRouter.delete("/:id", deleteBlackboardLimiter , verifyToken, removeEntry);

export default blackboardRouter;