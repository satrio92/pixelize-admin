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

const loginUserValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8).max(20).regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d){8,20}/)
})

const updateUserValidation = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().min(6).max(20).optional(),
  name: Joi.string().max(100).optional(),
  password: Joi.string().optional().min(8).max(20).regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d){8,20}/),
  isVerified: Joi.boolean().optional(),
  isAdmin: Joi.boolean().optional(),
  updatedAt: Joi.date()
})

export { registerUserValidation, loginUserValidation, updateUserValidation }