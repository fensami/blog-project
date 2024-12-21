import { Types } from "mongoose";

export interface IBlog {
    title: string;
    content: string;
    author: Types.ObjectId;
    isPublished: boolean;
}
//Default is true (published)
//A reference to the User model, indicating the author of the blog post