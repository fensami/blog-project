import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { userService } from "./user.service"

const getAllUser = catchAsync(async (req, res) => {

    const result = await userService.getUser();

    sendResponse(res, {
        success: true,
        message: "All User Get  successful",
        statusCode: 500,
        data: result
    })
})

const adminBlockedUser = catchAsync(async (req, res) => {

    const { id } = req.params;

    const result = await userService.adminblockUserInDB(id)

    sendResponse(res, {
        success: true,
        message: "User blocked successfully",
        statusCode: 200,
    })
})


const adminCanDeleteAnyBlog = catchAsync(async (req, res) => {


    const { id } = req.params;
    const userRole = req.user?.role;

    const result = await userService.adminCanDeleteAnyBlogIntoDB(id, userRole)
    sendResponse(res, {
        success: true,
        message: "Blog deleted successfully",
        statusCode: 200,

    })
})


export const userController = {
    getAllUser,
    adminBlockedUser,
    adminCanDeleteAnyBlog
}