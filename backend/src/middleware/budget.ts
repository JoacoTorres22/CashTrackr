import type { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import Budget from "../models/Budget";

declare global { 
    namespace Express {
        interface Request {
            budget: Budget
        }
    }
}

export const validateBudgetId = async (req: Request, res: Response, next: NextFunction) => {
    await param('budgetId').isInt().withMessage('Invalid Id')
    .custom(value => value > 0).withMessage('Invalid Id')
    .run(req)

    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }
    next()
}

export const validateBudgetExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { budgetId } = req.params
        const budget = await Budget.findByPk(budgetId)
        if (!budget) {
            const error = new Error('Budget not found')
            res.status(404).json({error: error.message})
            return
        }
        req.budget = budget
        
        next()
    
    } catch (error) {
        res.status(500).json({error: 'Error'})
    }
}


export const validateBudgetInput = async (req: Request, res: Response, next: NextFunction) => {

    await body('name')
        .notEmpty().withMessage('Budget name is required').run(req)
    await body('amount')    
        .notEmpty().withMessage('The amount is required')
        .isNumeric().withMessage('The amount must be a number')        
        .custom( value => value > 0).withMessage('The amount must be more than 0').run(req)

    next()
}

export function hasAccess(req: Request, res: Response, next: NextFunction) {
    if (req.user.id !== req.budget.userId) {
        res.status(403).json({error: 'Forbidden'})
        return
    }
    next()
}