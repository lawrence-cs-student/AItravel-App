import express from "express";
import { signup, login } from "../controllers/authenticationController.js"; 
import { requestLogger } from '../middlewares/loggingMiddleware.js';

const router = express.Router();

router.use(requestLogger);

router.post("/signup", signup);
router.post("/login", login);

export default router;