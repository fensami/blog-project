import { User } from "./user.model"

// For Testing
const getUser = async () => {
    const result = await User.find()
    return result
}

export const userService = {
    getUser,
}