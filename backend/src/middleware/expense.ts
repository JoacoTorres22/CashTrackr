import type { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";


export const validateExpenseInput = async (req: Request, res: Response, next: NextFunction) => {

    await body('name')
        .notEmpty().withMessage('Budget name is required').run(req)
    await body('amount')    
        .notEmpty().withMessage('The amount is required')
        .isNumeric().withMessage('The amount must be a number')        
        .custom( value => value > 0).withMessage('The amount must be more than 0').run(req)

    next()
}