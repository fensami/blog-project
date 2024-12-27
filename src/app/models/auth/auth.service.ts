import config from "../../config";
import AppError from "../../errors/AappErrors";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcrypt"
import jwt, { JwtPayload } from "jsonwebtoken"


const register = async (payload: IUser) => {

    const result = await User.create(payload);

    return result

}

const login = async (payload: ILoginUser) => {

    const user = await User.findOne({ email: payload?.email }).select("+password")

    if (!user) {
        throw new AppError(401, "user is not found !")
    }

    const isUserBlocked = user?.isBlocked

    if (isUserBlocked === true) {
        throw new AppError(401, "user is blocked !")
    }

    const isPasswordMatch = await bcrypt.compare(payload?.password, user?.password)

    if (!isPasswordMatch) {
        throw new AppError(401, "Password is not mached !")
    }

    const accessToken = jwt.sign({ _id: user._id, email: user.email, role: user.role }, config.jwt_access_secret as string, { expiresIn: "30d" })

    const { password, ...remanningData } = user;

    return {
        accessToken,
        remanningData
    }
}

export const AuthServices = {
    register,
    login
}