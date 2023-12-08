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

const name = (req, res, next) => {
  res.send('hallo kukuh')
}
export default { register, name }