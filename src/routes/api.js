import express from "express";
import userController from "../controller/user_controller.js";
import {authMiddleware} from "../middleware/auth_middleware.js";

const authRoute = new express.Router();

authRoute.use(authMiddleware)
authRoute.get('/api/me', userController.me)
authRoute.patch('/api/user/update', userController.update)

export { authRoute }