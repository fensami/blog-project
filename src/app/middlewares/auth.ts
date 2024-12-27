import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user/user.model";
import config from "../config";

const auth = (...requiredRole: string[]) => {

    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new Error("you are not authorized Token ! ")
        };

        const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;


        const { email, role } = decoded;

        const user = await User.findOne({ email })

        if (!user) {
            throw new Error("User not found !")
        }

        if (requiredRole && !requiredRole.includes(role)) {
            throw new Error("you are not authorized !")
        }

        req.user = decoded as JwtPayload;

        next()
    })

}


export default auth