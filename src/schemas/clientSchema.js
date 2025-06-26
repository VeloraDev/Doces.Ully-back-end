import Joi from "joi";

export const createClientSchema = Joi.object({
  name: Joi.string().min(3).max(255).required().messages({
    "any.required": "O campo 'name' é obrigatório",
    "string.min": "O nome deve ter no mínimo {#limit} caracteres",
    "string.max": "O nome deve ter no máximo {#limit} caracteres",
  }),
  phone: Joi.string().required().messages({
    "any.required": "O campo 'phone' é obrigatório",
  }),
  password: Joi.string().min(8).max(255).required().messages({
    "any.required": "O campo 'password' é obrigatório",
    "string.min": "A senha deve ter no mínimo {#limit} caracteres",
    "string.max": "A senha deve ter no máximo {#limit} caracteres",
  }),
});

export const updateClientSchema = Joi.object({
  name: Joi.string().min(3).max(255).messages({
    "string.min": "O nome deve ter no mínimo {#limit} caracteres",
    "string.max": "O nome deve ter no máximo {#limit} caracteres",
  }),
  password: Joi.string().min(8).max(255).messages({
    "string.min": "A senha deve ter no mínimo {#limit} caracteres",
    "string.max": "A senha deve ter no máximo {#limit} caracteres",
  }),
});
