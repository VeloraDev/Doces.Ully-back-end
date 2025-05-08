import CategoryService from "../services/category.service.js";

export default class CategoryController {
  static async create(req, res){
    console.log(req.body);
    const category = await CategoryService.create(req.body);
    res.json(category);
  }
}