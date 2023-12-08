import Joi from 'joi';

const registerUserValidation = Joi.object({
  username: Joi.string().min(6).max(20).required(),
  name: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d){8,20}/),
  isVerified: Joi.boolean(),
  isAdmin: Joi.boolean(),
  createdAt: Joi.date(),
  updatedAt: Joi.date()
})

export { registerUserValidation }