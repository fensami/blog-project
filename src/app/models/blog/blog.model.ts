
import { IBlog } from "./blog.interface"
import { model, Schema } from "mongoose"


const blogSchema = new Schema<IBlog>({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})





export const Blog = model<IBlog>("Blog", blogSchema)

