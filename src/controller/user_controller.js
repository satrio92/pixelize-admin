import userService from "../services/user_service.js";
import User from "../models/user_model.js";
const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body)
    res.status(200).json({data: result})
  } catch (e) {
    next(e)
  }
}

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body)
    res.status(200).json({data: result})
  } catch(e) {
    next(e)
  }
}

const me = async (req, res, next) => {
  try {
    const result = await userService.me(req.user);
    res.status(200).json({data: result})
  } catch (e) {
    next(e)
  }
}
export default { register, login, me }