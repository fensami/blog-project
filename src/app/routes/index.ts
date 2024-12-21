import { Router } from "express"
import authRoute from "../models/auth/auth.route";
import userRoute from "../models/user/user.route";
import blogRoute from "../models/blog/blog.route";

const router = Router()


const moudulesRoute = [
    {
        path: "/auth",
        route: authRoute
    },
    {
        path: "/user",
        route: userRoute
    },
    {
        path: "/blogs",
        route: blogRoute
    },
]


moudulesRoute.forEach((route) => router.use(route.path, route.route));

export default router;