import express from 'express';
import { generateAttractions, saveDestination, getSaveDestinations } from '../controllers/destinationController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/generateAttractions", generateAttractions);
router.post("/saveDestination", authMiddleware, saveDestination);
router.get("/getSaveDestinations", authMiddleware, getSaveDestinations);

export default router;