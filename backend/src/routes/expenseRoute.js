import express from "express"
import { requestLogger } from '../middlewares/loggingMiddleware.js';
import { addExpenseController, getExpensesController } from "../controllers/travelExpenseController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.use(requestLogger);

router.post('/addExpense', authMiddleware , addExpenseController)
router.get('/getExpenses', authMiddleware, getExpensesController)

export default router;