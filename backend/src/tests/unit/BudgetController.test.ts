import { createRequest, createResponse } from 'node-mocks-http'; 
import { budgets } from '../mocks/budgets';
import { BudgetController } from '../../controllers/BudgetController';
import Budget from '../../models/Budget';

jest.mock('../../models/Budget', () => ({

    findAll: jest.fn(),
    create: jest.fn()
}));


describe('BudgetController.getAll', () => {

    beforeEach(() => {
        (Budget.findAll as jest.Mock).mockReset();
        (Budget.findAll as jest.Mock).mockImplementation((options) => {
            const updatedBudgets = budgets.filter(budget => budget.userId === options.where.userId);
            (Budget.findAll as jest.Mock).mockResolvedValue(updatedBudgets)
            return Promise.resolve(updatedBudgets);
        })
    })

    it('should return 2 budgets for user with ID 1', async () => {
        
        const req = createRequest({
            method: 'GET',
            url: '/api/budgets',
            user: { id: 1 }
        });
        
        const res = createResponse();
        await BudgetController.getAll(req, res);

        const data = res._getJSONData()

        expect(data).toHaveLength(2);
        expect(res.statusCode).toBe(200);
    })

    it('should return 1 budget for user with ID 2', async () => {
        
        const req = createRequest({
            method: 'GET',
            url: '/api/budgets',
            user: { id: 2 }
        });
        
        const res = createResponse();
        await BudgetController.getAll(req, res);

        const data = res._getJSONData()

        expect(data).toHaveLength(1);
    })

    it('should return 0 budgets for user with ID 10', async () => {
        
        const req = createRequest({
            method: 'GET',
            url: '/api/budgets',
            user: { id: 10 }
        });
        
        const res = createResponse();
        await BudgetController.getAll(req, res);

        const data = res._getJSONData()

        expect(data).toHaveLength(0);
    })

    it('should handle errors when fetching budgets', async () => {
        const req = createRequest({
            method: 'GET',
            url: '/api/budgets',
            user: { id: 10 }
        });
        
        const res = createResponse();
        (Budget.findAll as jest.Mock).mockRejectedValue(new Error);
        await BudgetController.getAll(req, res);

        expect(res.statusCode).toBe(500);

    })
})


describe('BudgetController.create', () => {
    it('should create a budget and respond with statusCode 201', async () => {

        const mockBudget = {
            save: jest.fn().mockResolvedValue(true)
        };

        (Budget.create as jest.Mock).mockResolvedValue(mockBudget);

        const req = createRequest({
            method: 'POST',
            url: '/api/budgets',
            user: { id: 1 },
            body: {
                name: 'Test Budget',
                amount: 100
            }
        });
        
        const res = createResponse();
        await BudgetController.create(req, res);

        const data = res._getJSONData()
        expect(res.statusCode).toBe(201);
        expect(data).toBe('Budget Created');
        expect(mockBudget.save).toHaveBeenCalled();
        expect(mockBudget.save).toHaveBeenCalledTimes(1);
        expect(Budget.create).toHaveBeenCalledWith(req.body);
    })

    it('should handle budget creation error', async () => {

        const mockBudget = {
            save: jest.fn()
        };

        (Budget.create as jest.Mock).mockRejectedValue(new Error);

        const req = createRequest({
            method: 'POST',
            url: '/api/budgets',
            user: { id: 1 },
            body: {
                name: 'Test Budget',
                amount: 100
            }
        });
        
        const res = createResponse();
        await BudgetController.create(req, res);

        const data = res._getJSONData()

        expect(res.statusCode).toBe(500);
        expect(data).toEqual({error: 'Error'});
        
        expect(Budget.create).toHaveBeenCalledWith(req.body);
    })
})
