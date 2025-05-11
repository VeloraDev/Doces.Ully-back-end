import Product from "../models/product.js";

export default class ProductService{
  static async create(data){
    return await Product.create(data);
  }

  static async getProducts(){
    return await Product.findAll();
  }

  static async getProductById(id){
    return await Product.findByPk(id);
  }

  static async update(id, data){
    const product = await Product.findByPk(id);
    if(!product) return null;

    return await product.update(data);
  }

  static async delete(id){
    const product = await Product.findByPk(id);
    if(!product) return null;
    
    await product.destroy();
    return true;
  }
}
