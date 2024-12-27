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

    const result = await blogServices.createBlogIntoDB(blogPayload)

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Blog is created successfully",
        data: {
            _id: result._id,
            title: result.title,
            content: result.content,
            author: result.author

        }
    })

})


const updateBlog = catchAsync(async (req, res) => {

    const { id } = req.params;
    const userId = req.user?._id;

    const result = await blogServices.updateBlogIntoDB(id, req.body, userId);


    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Blog is updated succesfully',
        data: {
            _id: result?._id,
            title: result?.title,
            content: result?.content,
            author: result?.author
        }
    });
});


const deleteBlog = catchAsync(async (req, res) => {

    const { id } = req.params;
    const userId = req.user?._id;

    const result = await blogServices.deleteBlogIntoDB(id, userId);

    sendResponse(res, {
        success: true,
        message: 'Blog is Deleted succesfully',
        statusCode: 200,
    });
});


const getAllBlog = catchAsync(async (req, res) => {


    const result = await blogServices.getAllBlogFromDb(req.query);

    sendResponse(res, {
        statusCode: 500,
        success: true,
        message: "Blogs fetched successfully",
        data: result
    })
})


export const blogControllers = {
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlog
}