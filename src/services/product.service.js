import Product from "../models/product.js";
import AppError from "../errors/AppError.js";

export default class ProductService{
  static async create(data){
    return await Product.create(data);
  }

  static async getProducts(){
    return await Product.findAll();
  }

  static async getProductById(id){
    const product = await Product.findByPk(id);
    if(!product){
      throw new AppError("Produto não encontrado", 404);
    }
    
    return product;
  }

  static async update(id, data){
    const product = await Product.findByPk(id);
    if(!product){
      throw new AppError("Produto não encontrado", 404);
    }

    return await product.update(data);
  }

  static async delete(id){
    const product = await Product.findByPk(id);
    if(!product){
      throw new AppError("Produto não encontrado", 404);
    }
    
    await product.destroy();
  }
}
