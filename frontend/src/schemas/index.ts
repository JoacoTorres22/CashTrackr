import { z } from 'zod';


export const RegisterSchema = z.object({

    email: z.string()
            .min(1, {message: 'Email Required'})
            .email(),
    name: z.string()
            .min(1, {message: 'Name Required'}),
    password: z.string()
            .min(8, {message: 'Password must be at least 8 characters'}),
    password_confirmation: z.string()
}).refine(data => data.password === data.password_confirmation, {
    message: "Passwords don't match", 
    path: ["password_confirmation"]
});

export const SuccessSchema = z.string()

export const ErrorResponseSchema = z.object({
        error: z.string()
})