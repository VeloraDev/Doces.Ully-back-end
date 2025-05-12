import { ValidationError } from "sequelize";
import ProductService from "../services/product.service.js";

export default class ProductController {
  static async create(req, res) {
    try {
      const { name, description, price, quantity, category_id } = req.body;
      const { filename } = req.file;
      const product = await ProductService.create({ name, description, price, quantity, category_id, img_path: `uploads/images/${filename}` } );
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

  static async index(req, res) {
    try {
      const products = await ProductService.getProducts();
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro interno no servidor",
      });
    }
  }

  static async show(req, res) {
    try {
      const product = await ProductService.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({
          message: "Produto não encontrado",
        });
      }

      return res.status(200).json(product);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro interno no servidor",
      });
    }
  }

  static async update(req, res) {
    try {
      const product = await ProductService.update(req.params.id, req.body);
      if (!product) {
        return res.status(404).json({
          message: "Produto não encontrado",
        });
      }

      return res.status(200).json(product);
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
  static async delete(req, res) {
    try {
      const productDestroy = await ProductService.delete(req.params.id);
      if (!productDestroy) {
        return res.status(404).json({
          message: "Produto não encontrado",
        });
      }

      return res.status(204).json();
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro interno no servidor",
      });
    }
  }
}
