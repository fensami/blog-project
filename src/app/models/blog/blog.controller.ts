import { error, log } from "console"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { blogServices } from "./blog.service"




const createBlog = catchAsync(async (req, res,) => {

    const authorId = req.user?._id;

    if (!authorId) {
        throw new Error("User not authenticated");
    }

    const blogPayload = {
        ...req.body,
        author: authorId,
    };

    // const result = await blogServices.createBlogIntoDB(req.body)
    const result = await blogServices.createBlogIntoDB(blogPayload)

    console.log(result);


    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Blog is created successfully",
        data: result
        // data: {
        //     _id: blogData._id,
        //     title: blogData.title,
        //     content: blogData.content,
        //     author: authorData,
        // }
    })

})


const updateBlog = catchAsync(async (req, res) => {

    // const authorId = req.user?._id;

    // if (!authorId) {
    //     throw new Error("User not authenticated");
    // }
    // const userId = req.user;
    // console.log("USer Id", userId);


    const { id } = req.params;
    const { updateBlogData, authorData } = await blogServices.updateBlogIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Blog is updated succesfully',
        data: {
            _id: updateBlogData?._id,
            title: updateBlogData?.title,
            content: updateBlogData?.content,
            author: authorData,
        }
    });
});


const deleteBlog = catchAsync(async (req, res) => {

    const { id } = req.params;

    const result = await blogServices.deleteBlogIntoDB(id);

    sendResponse(res, {
        success: true,
        message: 'Blog is Deleted succesfully',
        statusCode: 200,
    });
});


const getAllBlog = catchAsync(async (req, res) => {

    console.log(req.user);

    const result = await blogServices.getAllBlogFromDb(req.query);

    sendResponse(res, {
        statusCode: 500,
        success: true,
        message: "All Blog Showing Succesfully",
        data: result
    })
})


export const blogControllers = {
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlog
}