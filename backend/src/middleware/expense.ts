import type { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import Expense from "../models/Expense";

declare global { 
    namespace Express {
        interface Request {
            expense: Expense
        }
    }
}

export const validateExpenseInput = async (req: Request, res: Response, next: NextFunction) => {

    await body('name')
        .notEmpty().withMessage('Budget name is required').run(req)
    await body('amount')    
        .notEmpty().withMessage('The amount is required')
        .isNumeric().withMessage('The amount must be a number')        
        .custom( value => value > 0).withMessage('The amount must be more than 0').run(req)

    next()
}

export const validateExpenseId = async (req: Request, res: Response, next: NextFunction) => {

    await param('expenseId').isInt().custom( value => value > 0)
        .withMessage('Invalid Expense Id')
        .run(req)

        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()})
            return
        }



    next()
}

export const validateExpenseExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { expenseId } = req.params
        const expense = await Expense.findByPk(expenseId)
        if (!expense) {
            const error = new Error('Budget not found')
            res.status(404).json({error: error.message})
            return
        }
        req.expense = expense
        
        next()
    
    } catch (error) {
        res.status(500).json({error: 'Error'})
    }
}