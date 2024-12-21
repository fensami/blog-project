import { z } from 'zod';

const createUserValidationSchema = z.object({
    body: z.object({
        // user: z.object({
        name: z.string({ required_error: "Name Must Be Provided" }).min(1, "name is required"),
        email: z.string({ required_error: "Email Must Be Provided" }).email(),
        password: z.string({ required_error: "Password is required for your safety" }).max(20, { message: 'Password can not be more than 20 characters' }),

        // })

    })
})


export const userValidationSchema = {
    createUserValidationSchema
}