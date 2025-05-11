import { ValidationError } from "sequelize";
import ProductService from "../services/product.service.js";

export default class ProductController{
  static async create(req, res){
    try {
      const product = await ProductService.create(req.body);
      res.status(201).json(product);
    } catch (error) {
        if (error instanceof ValidationError) {
        const messages = error.errors.map((err) => err.message);
        return res.status(400).json({
          errors: messages,
        });
      }

      console.log(error);
      return res.status(500).json({
        message: "Erro interno no servidor",
      });
    }
  }
}