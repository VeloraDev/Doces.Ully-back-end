import Category from "../models/category.js";

export default class CategoryService {
  static async create(data) {
    try {
      console.log("Dados recebidos pelo service: " + data);
      const category = await Category.create(data);
      return category;
    } catch (error) {
      console.log(error.message);
    }
  }
}
