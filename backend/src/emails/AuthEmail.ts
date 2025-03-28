import { transport } from "../config/nodemailer"


type EmailType = {
    name: string
    email: string
    token: string
}



export class AuthEmail {
    static sendConfirmationEmail = async (user: EmailType) => {
        const email = await transport.sendMail({
            from: 'CashTrackr <joaquintorresfripp@gmail.com>',
            to: user.email,
            subject: 'CashTrackr - Confirm Account',
            html: `
                <p>Hola: ${user.name}, account created on CashTracker</p>
                <p>Visit this link to confirm your account: </p>
                <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirm Account</a>
                <p><b>${user.token}</b></p>
            `,
        })
        console.log('Email sent ', email.messageId)
    }

    static sendPasswordResetEmail = async (user: EmailType) => {
        const email = await transport.sendMail({
            from: 'CashTrackr <joaquintorresfripp@gmail.com>',
            to: user.email,
            subject: 'CashTrackr - Reset Password',
            html: `
                <p>Hi: ${user.name}</p>
                <p>Visit this link to reset your password: </p>
                <a href="${process.env.FRONTEND_URL}/auth/new-password">Reset Password</a>
                <p><b>${user.token}</b></p>
            `,
        })
        console.log('Email sent ', email.messageId)
    }
}