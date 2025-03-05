import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body, param, validationResult } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { limiter } from "../config/limiter";


const router = Router()

router.post('/create-account', 
    body('name')
        .notEmpty().withMessage('Name could not be empty'),
    body('password')
        .isLength({min: 8}).withMessage('Password too short'), 
    body('email')
        .isEmail().withMessage('Invalid Email'),
    handleInputErrors,   
    AuthController.createAccount
)

router.post('/confirm-account', 
    limiter,
    body('token')
        .notEmpty()
        .isLength({min: 6, max: 6})
        .withMessage('Invalid Token'),
    handleInputErrors,   
    AuthController.confirmAccount
)
export default router