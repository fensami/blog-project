import QueryBuilder from "../../builder/QueryBuilders";
import { User } from "../user/user.model";
import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import { blogSearchAbleFields } from "./blog.constant";

const createBlogIntoDB = async (payload: IBlog) => {
    const user = await User.findById(payload.author);


    if (!user) {
        throw new Error("Invalid user, author not found");
    }

    const blog = await Blog.create(payload);

    const result = await blog.populate("author", "name email role")

    return result;
}


const updateBlogIntoDB = async (id: string, payload: Partial<IBlog>, userId: string) => {

    const blogData = await Blog.findById(id);

    if (!blogData) {
        throw new Error("Blog is not found ! ")
    }

    if (blogData.author.toString() !== userId) {
        throw new Error("you are not author !")
    }

    const result = await Blog.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    })

    return result
};



const deleteBlogIntoDB = async (
    id: string,
    userId: string,
) => {

    const blog = await Blog.findById(id);
    if (!blog) {
        throw new Error("Blog is not found")
    }

    // Verify that the logged In user is the author of the blog
    if (blog.author.toString() !== userId) {
        throw new Error("You are not author ! You Can not delete this blog ! ");
    }

    const result = await Blog.findByIdAndDelete(id);

    return result;
}



const getAllBlogFromDb = async (query: Record<string, unknown>) => {
    const blogsQuery = new QueryBuilder(Blog.find().populate("author"), query)
        .search(blogSearchAbleFields)
        .sort()
        .filter();

    const result = await blogsQuery.modelQuery;

    return result;

}



export const blogServices = {
    createBlogIntoDB,
    updateBlogIntoDB,
    deleteBlogIntoDB,
    getAllBlogFromDb
}