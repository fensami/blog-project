import { Router } from "express";
import { userController } from "./user.controllers";
import auth from "../../middlewares/auth";

const userRoute = Router();



userRoute.get("/", auth("user", "admin"), userController.getAllUser)
export default userRoute;