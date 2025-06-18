import { ValidationError } from "sequelize";
import ProductService from "../services/product.service.js";
import fs from "fs";
import path from "path";

function productParse(product){
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
    category_id: product.category_id,
    img_url: product.img_url,
  };
}

export default class ProductController {
  static async create(req, res) {
    try {
      const { name, description, price, quantity, category_id } = req.body;
      if(!req.file){
        return res.status(400).json({
          error: "A imagem do produto é obrigatória",
        });
      }
      
      const { filename } = req.file;
      const product = await ProductService.create({ name, description, price, quantity, category_id, img_path: `uploads/images/${filename}` } );
      res.status(201).json(productParse(product));
    } catch (error) {
      if(req.file){
        fs.unlink(path.resolve("uploads", "images", req.file.filename), err => {
          if(err) console.log("Erro ao remover imagem: " + err);
        });
      }

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
      res.status(200).json(products.map(product => {
        return productParse(product);
      }));
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

      return res.status(200).json(productParse(product));
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro interno no servidor",
      });
    }
  }

  static async update(req, res) {
    try {
      const productExist = await ProductService.getProductById(req.params.id);
      if (!productExist) {
        return res.status(404).json({
          message: "Produto não encontrado",
        });
      }

      let img_path, oldPath = productExist.img_path;
      if(req.file){
        img_path = `uploads/images/${req.file.filename}`;
      }

      console.log(req.file);

      const product = await ProductService.update(req.params.id, { ...req.body, img_path });
      if(req.file){
        fs.unlink(path.resolve("uploads", "images", oldPath.split("/").pop()), err => {
          if(err) console.log("Erro ao remover imagem: " + err);
        });
      }

      return res.status(200).json(productParse(product));
      
    } catch (error) {
      if(req.file){
        fs.unlink(path.resolve("uploads", "images", req.file.filename), err => {
          if(err) console.log("Erro ao remover imagem: " + err);
        });
      }

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
