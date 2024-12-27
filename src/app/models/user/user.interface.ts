import { Model } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    isBlocked: boolean;
}

export interface UserModel extends Model<IUser> {
    isUserExistsById(_id: string): Promise<IUser>
}