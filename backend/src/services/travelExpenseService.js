import travelExpense from "../models/travelExpense.js";
import { BadRequestError } from "../utils/error.js";

export const recordExpense = async (userId, expenseRecord) => {
    
    if (!userId) {
        throw new BadRequestError("User Id is required!");
    }

    
    if (!expenseRecord) {
        throw new BadRequestError("Expense record is required!");
    }

    
    expenseRecord.userId = userId;

    
    const savedRecord = await travelExpense.create(expenseRecord);

    return {
        success: true,
        message: "Expense saved successfully",
        data: savedRecord  
    };
}


export const getExpenses = async (userId, date) => {
    if (!userId) {
        throw new BadRequestError("User Id is required!")
    }

    
    let year, month;
    
    if (date && date.year && date.month) {
        
        year = parseInt(date.year);
        month = parseInt(date.month);
    } else {
        
        const now = new Date();
        year = now.getFullYear();
        month = now.getMonth() + 1; 
    }
    
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    
    const expense = await travelExpense.find({
        userId: userId,
        date: {
            $gte: startDate,
            $lte: endDate
        }
    }).sort({ date: -1 });
    
    return expense;
}