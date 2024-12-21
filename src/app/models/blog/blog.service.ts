import { User } from "../user/user.model";
import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";

const createBlogIntoDB = async (payload: IBlog) => {

    const blogData = await Blog.create(payload);
    const authorData = await User.findOne(blogData.author);

    return { blogData, authorData };
}


const updateBlogIntoDB = async (id: string, payload: Partial<IBlog>) => {

    const blogData = await Blog.findById(id);


    if (!blogData) {
        throw new Error("Blog is not found")
    }


    const blog = await Blog.findById(id).populate("author");


    if (!blog || blog.author) {
        throw new Error("Invalid blog or author not found");
    }


    const updateBlogData = await Blog.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    })

    const authorData = await User.findOne(blogData?.author);



    return { updateBlogData, authorData }
};



const deleteBlogIntoDB = async (id: string) => {

    const blog = await Blog.findById(id);
    if (!blog) {
        throw new Error("Blog is not found")
    }
    const result = await Blog.findByIdAndDelete(id)

    return result
}


export const blogServices = {
    createBlogIntoDB,
    updateBlogIntoDB,
    deleteBlogIntoDB
}