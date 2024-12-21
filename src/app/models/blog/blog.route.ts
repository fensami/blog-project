import { Router } from "express";
import { blogControllers } from "./blog.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { blogsValidationSchema } from "./blog.validation";

const blogRoute = Router();

blogRoute.patch("/:id", auth("user"), validateRequest(blogsValidationSchema.updateBlogValidationSchema), blogControllers.updateBlog)

blogRoute.delete("/:id", auth("user"), blogControllers.deleteBlog)

blogRoute.post("/", auth("user"), validateRequest(blogsValidationSchema.createBlogValidationSchema), blogControllers.createBlog)
export default blogRoute;