import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { userService } from "./user.service"

const getAllUser = catchAsync(async (req, res) => {
    const result = await userService.getUser()

    sendResponse(res, {
        success: true,
        message: "All User Get  successful",
        statusCode: 500,
        data: result
    })
})

export const userController = {
    getAllUser
}