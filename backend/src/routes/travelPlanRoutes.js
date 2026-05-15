import express from "express";
import travelPlanController from "../controllers/travelPlanController.js";
import { requestLogger } from '../middlewares/loggingMiddleware.js';

const router = express.Router();

router.use(requestLogger);

router.post("/generate", travelPlanController);

export default router;
