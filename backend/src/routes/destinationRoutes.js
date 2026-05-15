import express from 'express';
import { getAttractions, saveDestination, unsaveDestination, getSaveDestinations, getSuggestedDestination } from '../controllers/destinationController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { requestLogger } from '../middlewares/loggingMiddleware.js';

const router = express.Router();

router.use(requestLogger);

router.get("/getAttractions", getAttractions);
router.post("/saveDestination", authMiddleware, saveDestination);
router.delete("/unsaveDestination/:id", authMiddleware, unsaveDestination);
router.get("/getSaveDestinations", authMiddleware, getSaveDestinations);
router.get("/getSuggestedSpots", getSuggestedDestination);

export default router;