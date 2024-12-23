import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user/user.model";
import config from "../config";

const auth = (...requiredRole: string[]) => {

    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const token = req.headers.authorization?.split(' ')[1];
        // const token = req.headers.authorization;


        // if (!token)

        if (!token) {
            throw new Error("you are not authorized Token ! ")
        };

        const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;

        // const tokenUserId = decoded._id;
        // if (!tokenUserId) {
        //     throw new Error("Invalid token: User ID is missing.");
        // }
        // const userId = decoded._id
        // console.log("userId:", userId);

        const { email, role } = decoded;

        const user = await User.findOne({ email })

        if (!user) {
            throw new Error("User not found !")
        }

        if (requiredRole && !requiredRole.includes(role)) {
            throw new Error("you are not authorized !")
        }

        // const authorId = req.user?._id;

        // if (!authorId) {
        //     throw new Error("User not authenticated");
        // }


        req.user = decoded as JwtPayload;

        next()
    })

}


export default auth