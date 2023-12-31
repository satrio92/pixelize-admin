import {validation} from "../validation/validation.js";
import {registerUserValidation, loginUserValidation, updateUserValidation} from "../validation/user_validation.js";
import User from "../models/user_model.js";
import bcrypt from "bcrypt";
import {errorResponse} from "../error/error_response.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

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

const login = async (request) => {
  const user = validation(loginUserValidation, request)

  const existingUser = await User.findOne({email: user.email})

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(user.password, existingUser.password)
    if (isPasswordValid) {
      const expiresInSeconds = 60 * 60 * 1;
      const token = await jwt.sign({
          email: existingUser.email,
        }, process.env.SECRET_KEY
        , { expiresIn: expiresInSeconds}
      )
      return { token: token }
    }
  }

  throw errorResponse(400, "user not found")
}

const me = async (request) => {
  const existingUser = await User.findOne({email: request.email})
  return {
    name: existingUser.name,
    username: existingUser.username,
    email: existingUser.email,
  }
}

const update = async (request) => {
  request.body.email = request.user.email
  const user = validation(updateUserValidation, request.body)
  if(user.password) {
    user.password = await bcrypt.hash(user.password, 10)
  }
  user.updatedAt = new Date()
  const updatedUser = await User.findOneAndUpdate(
    {email: request.user.email},
    user,
    { new: true }
  )

  if (!updatedUser) {
    throw errorResponse(400, "update user failed")
  }

  return {
    name: updatedUser.name,
    username: updatedUser.username,
    email: updatedUser.email,
  }
}

export default { register, login, me, update }