import type { NextFunction, Request, Response } from "express"
import Budget from "../models/Budget"
import Expense from "../models/Expense"

export class BudgetController {
    static getAll = async (req: Request, res: Response) => {
        try {
            const budgets = await Budget.findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
                where: {
                    userId: req.user.id
                }
            })
            res.json(budgets)
        } catch (error) {
            res.status(500).json({error: 'Error'})
        }
    }

    static create = async (req: Request, res: Response): Promise<void> => {
        try {
            const budget = await Budget.create(req.body)

            budget.userId = req.user.id
            await budget.save()
            res.status(201).json('Budget Created')
        } catch (error) {
            res.status(500).json({error: 'Error'})
        }
    }

    static getById = async (req: Request, res: Response) => {
        const budget = await Budget.findByPk(req.budget.id, {
            include: [Expense]
        })
        res.json(budget)
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

