import Joi from "joi";

export const createOrderSchema = Joi.object({
  is_pickup: Joi.boolean().required().messages({
    "any.required": "O campo 'is_pickup' é obrigatório",
    "boolean.base": "O campo 'is_pickup' deve ser um boolean",
  }),
  payment_method: Joi.string().valid("pix", "dinheiro").required().messages({
    "any.required": "O campo 'payment_method' é obrigatório",
    "any.only": "O campo 'payment_method' dever ser 'dinheiro' ou 'pix'",
  }),
  address: Joi.object({
    neighborhood: Joi.string().min(3).max(255).required().messages({
      "any.required": "O campo 'neighborhood' é obrigatório, dentro do objeto address",
      "string.min": "O bairro deve ter no mínimo {#limit} caracteres",
      "string.max": "O bairro deve ter no máximo {#limit} caracteres",
    }),
    street: Joi.string().min(3).max(255).required().messages({
      "any.required": "O campo 'street' é obrigatório, dentro do objeto address",
      "string.min": "O nome da rua deve ter no mínimo {#limit} caracteres",
      "string.max": "O nome da rua deve ter no máximo {#limit} caracteres",
    }),
    number: Joi.string().max(255).required().messages({
      "any.required": "O campo 'number' é obrigatório, dentro do objeto address",
      "string.max": "O número do local deve ter no máximo {#limit} caracteres",
      "string.base": "O campo número deve ser string",
    }),
  }).when("is_pickup", {
    is: false,
    then: Joi.required().messages({
      "any.required": "O objeto 'address' é obrigatório quando 'is_pickup' for falso",
    }),
    otherwise: Joi.forbidden().messages({
      "any.unknown": "O objeto 'address' não pode ser enviado quando 'is_pickup' é verdadeiro",
    }),
  }),
  products: Joi.array().items(Joi.object({
    product_id: Joi.string().guid({ version: "uuidv4" }).required().messages({
      "any.required": "O campo 'product_id' dentro do objeto no array 'products', é obrigatório",
      "string.guid": "O id do produto deve ser um UUID válido",
    }),
    quantity: Joi.number().integer().sign("positive").required().messages({
      "any.required": "O campo 'quantity' dentro do objeto no array 'products', é obrigatório",
      "number.integer": "A quantidade deve ser um número inteiro",
      "number.positive": "A quantidade deve ser um número positivo",
      "number.base": "A quantidade deve ser um número",
    })
  })).min(1).required().messages({ 
    "any.required": "O array 'products' é obrigatório",
    "array.min": "É necessário haver pelo menos {#limit} produto no array 'products'"
   }),
});
