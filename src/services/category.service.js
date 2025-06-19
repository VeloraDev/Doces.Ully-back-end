import { ValidationError, ValidationErrorItem } from "sequelize";
import Category from "../models/category.js";
import Product from "../models/product.js";

export default class CategoryService {
  static async create(data) {
    return await Category.create(data);
  }

  static async getCategories(){
    return await Category.findAll();
  }

  static async getCategoryById(id){
    return await Category.findByPk(id);
  }

  static async update(id, data){
    const category = await Category.findByPk(id);
    if(!category) return null;
    
    return await category.update(data);
  }

  static async delete(id){
    const category = await Category.findByPk(id, {
      include: {
        model: Product,
      }
    });
    if(!category) return null;
    if(category.Products.length !== 0){
      throw new ValidationError("Errors: ", [new ValidationErrorItem("A categoria só pode ser apagada se não houver produtos.")]);
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
    if(!category) return null;

    return category;
  }
}
