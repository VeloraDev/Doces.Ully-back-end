import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(255).required().messages({
    "any.required": "O campo 'name' é obrigatório",
    "string.min": "O nome deve ter no mínimo {#limit} caracteres",
    "string.max": "O nome deve ter no máximo {#limit} caracteres",
  }),
  description: Joi.string().min(3).max(255).required().messages({
    "any.required": "O campo 'description' é obrigatório",
    "string.min": "A descrição deve ter no mínimo {#limit} caracteres",
    "string.max": "A descrição deve ter no máximo {#limit} caracteres",
  }),
  price: Joi.number().min(0.01).precision(2).required().messages({
    "any.required": "O campo 'price' é obrigatório",
    "number.min": "O campo preço deve ser maior que {#min}",
    "number.precision": "O preço deve ter no máximo 2 casas decimais",
  }),
  quantity: Joi.number().integer().sign("positive").required().messages({
    "any.required": "O campo 'quantity' é obrigatório",
    "number.integer": "A quantidade deve ser um número inteiro",
    "number.positive": "A quantidade deve ser um número positivo",
  }),
  category_id: Joi.string().guid({ version: "uuidv4" }).required().messages({
    "any.required": "O campo 'category_id' é obrigatório",
    "string.guid": "O id de categoria deve ser um UUID válido",
  }),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(255).messages({
    "string.min": "O nome deve ter no mínimo {#limit} caracteres",
    "string.max": "O nome deve ter no máximo {#limit} caracteres",
  }),
  description: Joi.string().min(3).max(255).messages({
    "string.min": "A descrição deve ter no mínimo {#limit} caracteres",
    "string.max": "A deve ter no máximo {#limit} caracteres",
  }),
  price: Joi.number().min(0.01).precision(2).messages({
    "number.min": "O campo preço deve ser maior que {#min}",
    "number.precision": "O preço deve ter no máximo 2 casas decimais",
  }),
  quantity: Joi.number().integer().sign("positive").messages({
    "number.integer": "A quantidade deve ser um número inteiro",
    "number.positive": "A quantidade deve ser um número positivo",
  }),
  category_id: Joi.string().guid({ version: "uuidv4" }).messages({
    "string.guid": "O id de categoria deve ser um UUID válido",
  }),
});
