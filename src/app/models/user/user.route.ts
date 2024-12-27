import { Router } from "express";
import { userController } from "./user.controllers";
import auth from "../../middlewares/auth";

const userRoute = Router();

userRoute.get("/users", auth("user", "admin"), userController.getAllUser)

userRoute.patch("/admin/users/:id/block", auth("admin"), userController.adminBlockedUser)

userRoute.delete('/admin/blogs/:id', auth("admin"), userController.adminCanDeleteAnyBlog)



export default userRoute;