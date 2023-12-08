import {validation} from "../validation/validation.js";
import {registerUserValidation} from "../validation/user_validation.js";
import User from "../models/user_model.js";
import {json} from "express";
import bcrypt from "bcrypt";
import {errorResponse} from "../error/error_response.js";

const register = async (request) => {
  const user = validation(registerUserValidation, request)

  const existingEmail = await User.findOne({ email: user.email })
  const existingUsername = await User.findOne({ username: user.username })

  if (existingEmail) {
    throw errorResponse(400, "user already exist")
  } else if (existingUsername) {
    throw errorResponse(400, "username already taken" )
  }


  user.password = await bcrypt.hash(user.password, 10)
  const newUser = await new User(user);
  newUser
    .save()
    .then(
    () => {
      console.info(newUser)
    }
  );
  return {
    username: newUser.username,
    name: newUser.name,
    email: newUser.email,
  };
}

export default { register }