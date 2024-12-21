import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidationSchema } from "../user/user.validation";
import { authValidation } from "./auth.validation";

const authRoute = Router();

authRoute.post("/register", validateRequest(userValidationSchema.createUserValidationSchema), AuthControllers.register)

authRoute.post("/login", validateRequest(authValidation.loginValidationSchema), AuthControllers.login)
export default authRoute;