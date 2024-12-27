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


const adminUpdateIsblockedValidationSchema = z.object({
    body: z.object({
        isBlocked: z.boolean().refine(value => typeof value === 'boolean', {
            message: 'isBlocked must be a boolean value',
        }),
        // isBlocked: z.boolean(),
    })
})


export const userValidationSchema = {
    createUserValidationSchema,
    adminUpdateIsblockedValidationSchema
}