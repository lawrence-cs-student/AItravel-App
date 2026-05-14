import express from "express";
import travelPlanController from "../controllers/travelPlanController.js";

const router = express.Router();

router.post("/generate", travelPlanController);

export default router;
