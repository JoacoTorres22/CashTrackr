import { createRequest, createResponse } from 'node-mocks-http'; 
import { hasAccess, validateBudgetExists } from '../../../middleware/budget';
import Budget from '../../../models/Budget';
import { budgets } from '../../mocks/budgets';

jest.mock('../../../models/Budget', () => ({

    findAll: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn()
}));

describe('budget - validateBudgetExists', () => {

    it('should handle non-existent budget', async () => {
        (Budget.findByPk as jest.Mock).mockResolvedValue(null);

        const req = createRequest({
            params: {
                budgetId: 1
            }
        });

        const res = createResponse();
        const next = jest.fn();

        await validateBudgetExists(req, res, next);
        const data = res._getJSONData();
        expect(res.statusCode).toBe(404);
        expect(data).toEqual({ error: 'Budget not found' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should proceed to next middleware', async () => {
        (Budget.findByPk as jest.Mock).mockResolvedValue(budgets[0]);

        const req = createRequest({
            params: {
                budgetId: 1
            }
        });

        const res = createResponse();
        const next = jest.fn();

        await validateBudgetExists(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(req.budget).toEqual(budgets[0]);
    });

    it('should handle non-existent budget', async () => {
        (Budget.findByPk as jest.Mock).mockRejectedValue(new Error('Error'));

        const req = createRequest({
            params: {
                budgetId: 1
            }
        });

        const res = createResponse();
        const next = jest.fn();

        await validateBudgetExists(req, res, next);
        const data = res._getJSONData();
        expect(res.statusCode).toBe(500);
        expect(data).toEqual({ error: 'Error' });
        expect(next).not.toHaveBeenCalled();
    });
});


describe('budget - hasAccess', () => {
    it('should call next is user has access to budget', () => {
        const req = createRequest({
            user: { id: 1 },
            budget: budgets[0]
        });
        
        const next = jest.fn();
        const res = createResponse();

        hasAccess(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledTimes(1);
    });

    it('should return 401 if userId has not access ', () => {
        const req = createRequest({
            user: { id: 2 },
            budget: budgets[0]
        });
        
        const next = jest.fn();
        const res = createResponse();

        hasAccess(req, res, next);
        const data = res._getJSONData();
        expect(res.statusCode).toBe(403);
        expect(data).toEqual({ error: 'Forbidden' });
        expect(next).not.toHaveBeenCalled();
    });
});