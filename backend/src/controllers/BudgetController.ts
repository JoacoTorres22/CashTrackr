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
        try {
            const id = req.params.id
            const budget = await Budget.findByPk(id)
            if (!budget) {
                const error = new Error('Budget not found')
                res.status(404).json({error: error.message})
                return
            }
            res.json(budget)
        } catch (error) {
            res.status(500).json({error: 'Error'})
        }
    }

    static updateById = async (req: Request, res: Response) => {
        console.log('Desde put /api/budgets')
    }
    
    static deleteById = async (req: Request, res: Response) => {
        console.log('Desde delete /api/budgets')
    }
}

