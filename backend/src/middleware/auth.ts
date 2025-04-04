import type { NextFunction, Request, Response } from "express"
import User from "../models/User"
import jwt from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    
    const bearer = req.headers.authorization
    if (!bearer) {
        res.status(401).json({error: 'Unauthorized'})
        return
    }

    const [ , token] = bearer.split(' ')

    if (!token) {
        res.status(401).json({error: 'Unauthorized'})
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        if (typeof decoded === 'object' && decoded.id) {
            req.user = await User.findByPk(decoded.id, {
                attributes: ['id', 'name', 'email']
                })
            next()  
        }
    } catch (error) {
        res.status(500).json({error: 'Unauthorized'})
    }


}