import CategoryService from "../services/category.service.js";

function categoryParse(category){
  return {
    id: category.id,
    name: category.name
  };
}

export default class CategoryController {
  static async create(req, res, next) {
    try {
      const category = await CategoryService.create(req.body);
      return res.status(201).json(categoryParse(category));
    } catch (error) {
      next(error);
    }
  }

  static async index(req, res, next) {
    try {
      const categories = await CategoryService.getCategories();
      res.status(200).json(categories.map(category => {
        return categoryParse(category);
      }));
    } catch (error) {
      next(error);
    }
  }

  static async show(req, res, next) {
    try {
      const category = await CategoryService.getCategoryById(req.params.id);
      return res.status(200).json(categoryParse(category));
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const category = await CategoryService.update(req.params.id, req.body);
      return res.status(200).json(categoryParse(category));
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await CategoryService.delete(req.params.id);
      return res.status(204).json();
    } catch (error) {
      next(error);
    }
  }

  static async showProducts(req, res, next){
    try {
      const category = await CategoryService.getCategoryProducts(req.params.id);
      res.status(200).json({
        ...categoryParse(category),
        products: category.Products.map(product => {
          return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            category_id: product.category_id,
            img_url: product.img_url,
          };
        }),
      });
    } catch (error) {
      next(error);
    }
  }
}
