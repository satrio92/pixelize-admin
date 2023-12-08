import express from "express";
import userController from "../controller/user_controller.js";

const publicRoute = new express.Router();

publicRoute.post('/api/users', userController.register)

export { publicRoute }