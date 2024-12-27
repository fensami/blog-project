import { Blog } from "../blog/blog.model";
import { User } from "./user.model";

// For Testing
const getUser = async () => {
    const result = await User.find()
    return result
}


const adminblockUserInDB = async (id: string) => {
    // Find the user id
    const user = await User.findById(id);
    // Check if the user exists
    if (!user) {
        throw new Error("User not found");
    }

    // Check if the user is already blocked
    if (user.isBlocked) {
        throw new Error("User is already blocked ! You can not block this user ! ");
    }
    const result = await User.findByIdAndUpdate(
        id,
        { isBlocked: true },
        {
            new: true,
            runValidators: true,
        },
    );
    return result;
};

const adminCanDeleteAnyBlogIntoDB = async (id: string, userRole: string) => {

    const blogId = await Blog.findById(id);


    if (!blogId) {
        throw new Error("Blog is not found ! ")
    }

    if (userRole !== "admin") {
        throw new Error("you are not admin ! you can not delete this blog ! ")
    }


    const result = await Blog.findByIdAndDelete(id);

    return result;


}

export const userService = {
    getUser,
    adminblockUserInDB,
    adminCanDeleteAnyBlogIntoDB
}