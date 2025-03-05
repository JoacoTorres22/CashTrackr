import type { NextFunction, Request, Response } from "express"
import User from "../models/User"
import { checkPassword, hashPassword } from "../utils/auth"
import { generateToken } from "../utils/token"
import { AuthEmail } from "../emails/AuthEmail"
import { generateJWT } from "../utils/jwt"




export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        const { email, password } = req.body

        // Duplicates
        const userExists = await User.findOne({where: {email}})
        
        if (userExists) {
            const error = new Error('User exists')
            res.status(409).json({error: error.message})
            return
        }
        
        try {
            const user = new User(req.body)

            user.password = await hashPassword(password)
            user.token = generateToken()
            await user.save()

            await AuthEmail.sendConfirmationEmail({
                name: user.name,
                email: user.email,
                token: user.token
            })
            res.json('Account created')
        } catch (error) {
            res.status(500).json({error: 'Error ocurred'})
        }
    }

    static confirmAccount = async (req: Request, res: Response) => {
        const { token } = req.body
        
        const user = await User.findOne({where: { token }})

        if (!user) {
            const error = new Error('Invalid Token')
            res.status(401).json({error: error.message})
            return
        }
        user.confirmed = true
        user.token = null
        await user.save()

        res.json('Account confirmed')

    }

    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body

        const user = await User.findOne({where: {email}})
        
        if (!user) {
            const error = new Error('User not found')
            res.status(404).json({error: error.message})
            return
        }

        if(!user.confirmed) {
            const error = new Error('Account not confirmed')
            res.status(403).json({error: error.message})
            return
        }

        const isPasswordCorrect = await checkPassword(password, user.password)
        if(!isPasswordCorrect) {
            const error = new Error('Incorrect password')
            res.status(401).json({error: error.message})
            return
        }

        const jwt = generateJWT(user.id)

        res.json(jwt)
    }

}