import { z } from 'zod';

const createBlogValidationSchema = z.object({
    body: z.object({
        title: z.string({ required_error: "Title Must Be Provided" }),
        content: z.string({ required_error: "Content Must Be Provided" }),
    })
})
const updateBlogValidationSchema = z.object({
    body: z.object({
        title: z.string({ required_error: "Title Must Be Provided" }).optional(),
        content: z.string({ required_error: "Content Must Be Provided" }).optional(),
    })
})


export const blogsValidationSchema = {
    createBlogValidationSchema,
    updateBlogValidationSchema
}