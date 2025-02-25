import type { NextFunction, Request, Response } from "express"
import Budget from "../models/Budget"

export class BudgetController {
    static getAll = async (req: Request, res: Response) => {
        console.log('Desde /api/budgets')
    }

    static create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const budget = new Budget(req.body)

            await budget.save()
            res.status(201).json('Budget Created')
        } catch (error) {
            res.status(500).json({error: 'Error'})
        }
    }

    static getById = async (req: Request, res: Response) => {
        console.log('Desde get /api/budgets')
    }

    static updateById = async (req: Request, res: Response) => {
        console.log('Desde put /api/budgets')
    }
    
    static deleteById = async (req: Request, res: Response) => {
        console.log('Desde delete /api/budgets')
    }
}

