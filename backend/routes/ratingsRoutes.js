import { Router } from "express";
import { submitRating  , fetchRatings} from "../controller/ratingController.js";

const ratingRouter = Router();

ratingRouter.post('/' , submitRating);
ratingRouter.get('/' , fetchRatings);

export default ratingRouter;