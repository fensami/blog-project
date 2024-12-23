import { User } from "./user.model"

// For Testing
const getUser = async () => {
    const result = await User.find()
    // console.log(result._id);

    return result
}

export const userService = {
    getUser,
}