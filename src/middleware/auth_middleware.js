import {errorResponse} from "../error/error_response.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')

  if (!token) {
    return next(errorResponse(401, "Unauthorized"));
  }
  else {
    try {
      const decode = await jwt.verify(token.split(' ')[1], process.env.SECRET_KEY)
      req.user = decode
      next();
    } catch(e) {
      return next(errorResponse(401, "Unauthorized"));
    }
  }
}

export { authMiddleware }