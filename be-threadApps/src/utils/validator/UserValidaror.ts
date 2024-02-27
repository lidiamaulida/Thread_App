import * as joi from "joi";

export const registerSchema = joi.object({
  userName: joi.string().max(15).min(1).allow(null),
  fullName: joi.string().max(20).min(1).required(),
  email: joi.string().required(),
  password: joi.string().required().min(3),
  profil_picture: joi.string().allow(null),
  profil_description: joi.string().allow(null),
});

export const loginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required().min(3),
})
