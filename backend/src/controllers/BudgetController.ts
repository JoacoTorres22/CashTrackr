import type { NextFunction, Request, Response } from "express"
import Budget from "../models/Budget"

export class BudgetController {
    static getAll = async (req: Request, res: Response) => {
        try {
            const budgets = await Budget.findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
                // TODO: Filtrar by User
            })
            res.json(budgets)
        } catch (error) {
            res.status(500).json({error: 'Error'})
        }
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

        res.json(req.budget)
    }

    static updateById = async (req: Request, res: Response) => {
        
        await req.budget.update(req.body)
        res.json('Budget Updated')
    }
    
    static deleteById = async (req: Request, res: Response) => {

        await req.budget.destroy()
        res.json('Budget Deleted')
    }
}

