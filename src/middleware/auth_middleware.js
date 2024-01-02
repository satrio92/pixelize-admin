import {errorResponse} from "../error/error_response.js";
import jwt from "jsonwebtoken";
import BlacklistedToken from "../models/blacklisted_token_model.js";

const authMiddleware = async (req, res, next) => {
  let token = req.header('Authorization')
  if (!token) {
    return next(errorResponse(401, "Unauthorized"));
  }
  else {
    token = token.split(' ')[1]
    const isTokenExisted = await BlacklistedToken.findOne({token: token})
    if(isTokenExisted) {
      return next(errorResponse(401, "Unauthorized"));
    }
    try {
      const decode = await jwt.verify(token, process.env.SECRET_KEY)
      req.user = decode
      req.token = token
      next();
    } catch(e) {
      return next(errorResponse(401, "Unauthorized"));
    }
  }
}

export { authMiddleware }