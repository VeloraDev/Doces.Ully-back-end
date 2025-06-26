import Joi from "joi";

export const createAddressSchema = Joi.object({
  neighborhood: Joi.string().min(3).max(255).required().messages({
    "any.required": "O campo 'neighborhood' é obrigatório",
    "string.min": "O bairro deve ter no mínimo {#limit} caracteres",
    "string.max": "O bairro deve ter no máximo {#limit} caracteres",
  }),
  street: Joi.string().min(3).max(255).required().messages({
    "any.required": "O campo 'street' é obrigatório",
    "string.min": "O nome da rua deve ter no mínimo {#limit} caracteres",
    "string.max": "O nome da rua deve ter no máximo {#limit} caracteres",
  }),
  number: Joi.string().max(255).required().messages({
    "any.required": "O campo 'number' é obrigatório",
    "string.max": "O número do local deve ter no máximo {#limit} caracteres",
  }),
  landmark: Joi.string().max(255).messages({
    "string.max": "A referência deve ter no máximo {#limit} caracteres",
  }),
});

export const updateAddressSchema = Joi.object({
  neighborhood: Joi.string().min(3).max(255).messages({
    "string.min": "O bairro deve ter no mínimo {#limit} caracteres",
    "string.max": "O bairro deve ter no máximo {#limit} caracteres",
  }),
  street: Joi.string().min(3).max(255).messages({
    "string.min": "O nome da rua deve ter no mínimo {#limit} caracteres",
    "string.max": "O nome da rua deve ter no máximo {#limit} caracteres",
  }),
  number: Joi.string().max(255).messages({
    "string.max": "O número do local deve ter no máximo {#limit} caracteres",
  }),
  landmark: Joi.string().max(255).messages({
    "string.max": "A referência deve ter no máximo {#limit} caracteres",
  }),
});
