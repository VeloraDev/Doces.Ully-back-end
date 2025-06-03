import { ValidationError } from "sequelize";
import CategoryService from "../services/category.service.js";

function categoryParse(category){
  return {
    id: category.id,
    name: category.name
  };
}

export default class CategoryController {
  static async create(req, res) {
    try {
      const category = await CategoryService.create(req.body);
      return res.status(201).json(categoryParse(category));
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
      const categories = await CategoryService.getCategories();
      res.status(200).json(categories.map(category => {
        return categoryParse(category);
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
      const category = await CategoryService.getCategoryById(req.params.id);
      if (!category) {
        return res.status(404).json({
          message: "Categoria não encontrada",
        });
      }

      return res.status(200).json(categoryParse(category));
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro interno no servidor",
      });
    }
  }

  static async update(req, res) {
    try {
      const category = await CategoryService.update(req.params.id, req.body);
      if (!category) {
        return res.status(404).json({
          message: "Categoria não encontrada",
        });
      }

      return res.status(200).json(categoryParse(category));
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
      const categoryDestroy = await CategoryService.delete(req.params.id);
      if (!categoryDestroy) {
        return res.status(404).json({
          message: "Categoria não encontrada",
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
