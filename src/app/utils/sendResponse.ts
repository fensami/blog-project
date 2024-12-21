import { Response } from "express";


type TResponse<T> = {
    statusCode: number,
    success: boolean,
    message?: string,
    // token?: string,
    data?: T
}
const sendResponse = <T>(res: Response, data: TResponse<T>) => {
    res.status(data?.statusCode).json({
        success: data.success,
        message: data.message,
        // token: data.token,
        statusCode: data.statusCode,
        data: data.data
    })
}

export default sendResponse