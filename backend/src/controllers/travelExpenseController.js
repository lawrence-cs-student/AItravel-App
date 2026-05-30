import { recordExpense, getExpenses } from "../services/travelExpenseService.js";


const addExpenseController = async (req, res) => {
    try {
        const userId = req.user.id;
        const expenseRecord = req.body.expense

        const expense = await recordExpense(userId, expenseRecord);
        res.status(201).json({
            success: true,
            data: expense
        });
    } catch (err) {
        console.error("Error in addExpense:", err);
        
        if (err.name === 'BadRequestError') {
            
            return res.status(400).json({
                success: false,
                error: err.message
            });
        }
        
        
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
        
    }
}

const getExpensesController = async (req, res) => {
    try {

        const userId = req.user.id;
        const date = req.query;


        const expenses = await getExpenses(userId, date)

        res.status(201).json({
            detail: "Expenses fetched successfully",
            data: expenses
        });

    } catch (err) {
        console.error("Error in fetching expenses: ", err);

        if (err.name === 'BadRequestError') {
            
            return res.status(400).json({
                success: false,
                error: err.message
            });
        }
        
        
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
}

export { addExpenseController, getExpensesController }
    
