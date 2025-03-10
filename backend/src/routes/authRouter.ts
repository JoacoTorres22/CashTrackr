import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body, param, validationResult } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { limiter } from "../config/limiter";
import { authenticate } from "../middleware/auth";


const router = Router()

router.use(limiter)

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
    body('token')
        .notEmpty()
        .isLength({min: 6, max: 6})
        .withMessage('Invalid Token'),
    handleInputErrors,   
    AuthController.confirmAccount
)

router.post('/login', 
    body('email')
        .isEmail().withMessage('Invalid Email'),
    body('password')
        .notEmpty().withMessage('Password is required'), 
    handleInputErrors,    
    AuthController.login
)

router.post('/forgot-password',
    body('email')
        .isEmail().withMessage('Invalid Email'),
    handleInputErrors,
    AuthController.forgotPassword
)

router.post('/validate-token', 
    body('token')
        .notEmpty()
        .isLength({min: 6, max: 6})
        .withMessage('Invalid Token'),
    handleInputErrors,   
    AuthController.validateToken
)

router.post('/reset-password/:token',
    param('token')
        .notEmpty()
        .isLength({min: 6, max: 6})
        .withMessage('Invalid Token'),
    body('password')
        .isLength({min: 8}).withMessage('Password too short'), 
    handleInputErrors,
    AuthController.resetPasswordWithToken
) 

router.get('/user', 
    authenticate,
    AuthController.user
)

router.post('/update-password',
    authenticate,
    body('current_password')
        .notEmpty().withMessage('Password cannot be empty'), 
    body('password')
        .isLength({min: 8}).withMessage('New password too short'), 
    handleInputErrors,
    AuthController.updateCurrentUserPassword
)

router.post('/check-password',
    authenticate,
    body('password')
        .notEmpty().withMessage('Password cannot be empty'), 
    handleInputErrors,
    AuthController.checkPassword
)

export default router