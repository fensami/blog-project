import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { blogServices } from "./blog.service"

const createBlog = catchAsync(async (req, res,) => {

    const { blogData, authorData } = await blogServices.createBlogIntoDB(req.body)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Blog is created successfully",
        data: {
            _id: blogData._id,
            title: blogData.title,
            content: blogData.content,
            author: authorData,
        }
    })

})


const updateBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    // const { authorData } = req.body
    // const payload = req.body;
    // const { faculty } = req.body;
    const { updateBlogData, authorData } = await blogServices.updateBlogIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: 500,
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

export const blogControllers = {
    createBlog,
    updateBlog
}