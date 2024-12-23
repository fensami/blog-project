import { log } from "console";
import QueryBuilder from "../../builder/QueryBuilders";
import { User } from "../user/user.model";
import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import { blogSearchAbleFields } from "./blog.constant";

const createBlogIntoDB = async (payload: IBlog) => {

    const result = (await Blog.create(payload)).populate("author", "name email role");
    console.log('kaku', result);


    // const fetchedBlog = await blogData(blogData._id.toString());

    // return result.populate("author", "name email role");
    return result;
}


const updateBlogIntoDB = async (id: string, payload: Partial<IBlog>) => {

    const blogData = await Blog.findById(id);



    // console.log(blogData._id.toString());



    // console.log(blogData, "blogdata");

    // const userdata = await User.findById(userId);
    // console.log(userdata);

    // if (!userId) {
    //     throw new Error("Blog is not found")
    // }

    if (!blogData) {
        throw new Error("Blog is not found")
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



const getAllBlogFromDb = async (query: Record<string, unknown>) => {
    const blogsQuery = new QueryBuilder(Blog.find().populate("author"), query)
        .search(blogSearchAbleFields)
        .sort()
        .filter();

    const result = await blogsQuery.modelQuery;



    return result

}



export const blogServices = {
    createBlogIntoDB,
    updateBlogIntoDB,
    deleteBlogIntoDB,
    getAllBlogFromDb
}