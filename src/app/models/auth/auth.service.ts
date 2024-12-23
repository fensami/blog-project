import config from "../../config";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const register = async (payload: IUser) => {
    const result = await User.create(payload);

    return result
}

const login = async (payload: ILoginUser) => {


    // const user = await User.isUserExistsById(_id);

    const user = await User.findOne({ email: payload?.email }).select("+password")

    if (!user) {
        throw new Error("user is not found !")
    }

    const isUserBlocked = user?.isBlocked

    if (isUserBlocked === true) {
        throw new Error("user is blocked !")
    }

    const isPasswordMatch = await bcrypt.compare(payload?.password, user?.password)

    if (!isPasswordMatch) {
        throw new Error("Password is not mached !")
    }


    const token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, config.jwt_access_secret as string, { expiresIn: "30d" })
    // console.log("sign Token : ", token);

    const { password, ...remanningData } = user;


    return { token, remanningData }
}

export const AuthServices = {
    register,
    login
}