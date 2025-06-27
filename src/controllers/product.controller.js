import cloudinary from "../config/cloudinary.js";
import ProductService from "../services/product.service.js";
import extractPublicId from "../utils/cloudinaryHelper.js";

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
    let public_id = null;
    try {
      if(!req.file){
        return res.status(400).json({
          errors: ["A imagem do produto é obrigatória"],
        });
      }

      const result = await cloudinary.uploader.upload(req.file.path, { 
        public_id: `${req.body.name.toLowerCase().replace(/\s/g, '-')}-${Date.now()}`, 
        folder: "products" 
      });
      public_id = result.public_id;
      const product = await ProductService.create({ ...req.body, img_path: result.secure_url } );
      res.status(201).json(productParse(product));
    } catch (error) {
      if(req.file && public_id){
        await cloudinary.uploader.destroy(public_id);
      }
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

      let result = null;
      if(req.file){
        result = await cloudinary.uploader.upload(req.file.path, { 
          public_id: `${productExist.name.toLowerCase().replace(/\s/g, '-')}-${Date.now()}`, 
          folder: "products" 
        });
        const public_id = extractPublicId(productExist.img_path);
        await cloudinary.uploader.destroy(public_id);
      }

      const product = await ProductService.update(req.params.id, { ...req.body, img_path: result ? result.secure_url : productExist.img_path });
      return res.status(200).json(productParse(product));
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const productExist = await ProductService.getProductById(req.params.id);
      const public_id = extractPublicId(productExist.img_path);
      await cloudinary.uploader.destroy(public_id);
      await ProductService.delete(req.params.id);
      return res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}
