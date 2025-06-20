import { ValidationError } from "sequelize";
import AppError from "../errors/AppError.js";

export default function errorHandler(err, req, res, next){
  if(err instanceof ValidationError){
    const messages = err.errors.map((error) => error.message);
    return res.status(400).json({
      errors: messages,
    });
  }

  if(err instanceof AppError){
    return res.status(err.statusCode).json({
      errors: err.errors,
    });
  }

  console.log("Erro desconhecido: " + err);
  res.status(500).json({
    errors: ["Erro interno no servidor"]
  });
}