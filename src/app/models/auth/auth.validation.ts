import { z } from "zod";

const loginValidationSchema = z.object({
    body: z.object({
        email: z.string({ required_error: "email Is required !" }).email(),
        password: z.string({ required_error: "password is required !" })
    })
})



export const authValidation = {
    loginValidationSchema
}