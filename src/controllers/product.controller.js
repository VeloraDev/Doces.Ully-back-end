import ProductService from "../services/product.service.js";

function productParse(product){
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
    category_id: product.category_id,
    img_url: product.img_path,
  };
}

export default class ProductController {
  static async create(req, res, next) {
    try {
      if(!req.file){
        return res.status(400).json({
          errors: ["A imagem do produto é obrigatória"],
        });
      }
      
      const url = req.file.path;
      const product = await ProductService.create({ ...req.body, img_path: url } );
      res.status(201).json(productParse(product));
    } catch (error) {
      next(error);
    }
  }

  static async index(req, res, next) {
    try {
      const products = await ProductService.getProducts();
      res.status(200).json(products.map(product => {
        return productParse(product);
      }));
    } catch (error) {
      next(error);
    }
  }

  static async show(req, res, next) {
    try {
      const product = await ProductService.getProductById(req.params.id);
      return res.status(200).json(productParse(product));
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const productExist = await ProductService.getProductById(req.params.id);

      let img_path = productExist.img_path;
      if(req.file){
        img_path = req.file.path;
      }

      const product = await ProductService.update(req.params.id, { ...req.body, img_path });
      return res.status(200).json(productParse(product));
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      await ProductService.delete(req.params.id);
      return res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}
