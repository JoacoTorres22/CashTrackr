import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body, param, validationResult } from "express-validator";
import { handleInputErrors } from "../middleware/validation";


const router = Router()

router.post('/create-account', 
    body('name')
        .notEmpty().withMessage('Name could not be empty'),
    body('password')
        .isLength({min: 8}).withMessage('Password too short'), 
    body('email')
        .isEmail().withMessage('Invalid Email'),
    handleInputErrors,   
    AuthController.createAccount)

export default router