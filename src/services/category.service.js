import { ValidationError, ValidationErrorItem } from "sequelize";
import Category from "../models/category.js";
import Product from "../models/product.js";
import AppError from "../errors/AppError.js";

export default class CategoryService {
  static async create(data) {
    return await Category.create(data);
  }

  static async getCategories(){
    return await Category.findAll();
  }

  static async getCategoryById(id){
    const category = await Category.findByPk(id);
    if(!category){
      throw new AppError("Categoria não encontrada", 404);
    }
  }

  static async update(id, data){
    const category = await Category.findByPk(id);
    if(!category) {
      throw new AppError("Cateogria não encontrada", 404);
    }
    
    return await category.update(data);
  }

  static async delete(id){
    const category = await Category.findByPk(id, {
      include: {
        model: Product,
      }
    });
    if(!category) {
      throw new AppError("Categoria não encontrada", 404);
    }
    if(category.Products.length !== 0){
      throw new AppError("A categoria só pode ser apagada se não houver produtos", 400);
    }
    
    await category.destroy();
    return true;
  }

  static async getCategoryProducts(id){
    const category = await Category.findByPk(id, {
      include: {
        model: Product,
      }
    });
    if(!category) {
      throw new AppError("Categoria não encontrada", 404);
    }

    return category;
  }
}
