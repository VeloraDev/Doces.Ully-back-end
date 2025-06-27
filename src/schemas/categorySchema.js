import Joi from "joi";

export const createCategorySchema = Joi.object({
  name: Joi.string().min(3).max(255).required().messages({
    "any.required": "O campo 'name' é obrigatório",
    "string.min": "O nome deve ter no mínimo {#limit} caracteres",
    "string.max": "O nome deve ter no máximo {#limit} caracteres",
  }),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().min(3).max(255).messages({
    "string.min": "O nome deve ter no mínimo {#limit} caracteres",
    "string.max": "O nome deve ter no máximo {#limit} caracteres",
  }),
});
