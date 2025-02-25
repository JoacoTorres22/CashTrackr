import { Router } from "express";
import { body, param } from "express-validator"
import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";


const router = Router()


router.get('/', BudgetController.getAll)

router.post('/', 
    body('name')
        .notEmpty().withMessage('Budget name is required'),
    body('amount')    
        .notEmpty().withMessage('The amount is required')
        .isNumeric().withMessage('The amount must be a number')        
        .custom( value => value > 0).withMessage('The amount must be more than 0'),
    handleInputErrors,
    BudgetController.create
)

router.get('/:id', 
    param('id').isInt().withMessage('Invalid Id')
    .custom(value => value > 0).withMessage('Invalid Id'),
    BudgetController.getById)

router.put('/:id', BudgetController.updateById)

router.delete('/:id', BudgetController.deleteById)


export default router