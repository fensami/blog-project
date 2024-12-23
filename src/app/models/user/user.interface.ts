import { Model } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    isBlocked: boolean;
}

export interface UserModel extends Model<IUser> {
    // myStaticMethod(): number;
    isUserExistsById(_id: string): Promise<IUser>
    // isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>
}