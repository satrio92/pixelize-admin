import express from "express";
import userController from "../controller/user_controller.js";

const publicRoute = new express.Router();

publicRoute.post('/api/users', userController.register)
publicRoute.post('/api/login', userController.login)

export { publicRoute }