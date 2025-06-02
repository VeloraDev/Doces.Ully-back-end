import { ValidationError, ValidationErrorItem } from "sequelize";
import Order from "../models/order.js";
import OrderProduct from "../models/orderProduct.js";
import Product from "../models/product.js";

export default class OrderService {
  static async create(data){
    if (data.is_pickup === false) {
      const errors = [];
      if (!data.address_neighborhood) errors.push("Campo bairro é obrigatório");
      if (!data.address_street) errors.push("Campo rua é obrigatório");
      if (!data.address_number) errors.push("Campo número é obrigatório");

      if (errors.length) {
        throw new ValidationError("Falha na validação do endereço:", errors.map(e => new ValidationErrorItem(e)));
      }
    }

    const { products = null } = data;
    if (!Array.isArray(products) || products.length === 0) {
      throw new ValidationError("Lista de produtos é obrigatória e não pode ser vazia", [
        new ValidationErrorItem("Nenhum produto foi enviado"),
      ]);
    }
    
    await this.validateProducts(products);

    const order = await Order.create(data);
    await this.addProductOrder(products, order);

    return Order.findByPk(order.id, {
      include: [{
        model: Product,
        through: { attributes: ['quantity'] }
      }]
    });
  }

  static async validateProducts(products){
    const errors = [];
    for(const p of products){
      const product = await Product.findByPk(p.product_id);

      if(!product) {
        errors.push(`Produto com id '${p.product_id}' não encontrado`);
        continue;
      };
      if(p.quantity <= 0){
        errors.push(`Quantidade inválida no produto com id '${p.product_id}'`);
        continue;
      }
      if(product.quantity < p.quantity) {
        errors.push(`Produto com id '${p.product_id}' não tem estoque o suficiente`);
      }
    }

    if(errors.length !== 0) throw new ValidationError("Errors:", errors.map(e => new ValidationErrorItem(e)));
  }

  static async addProductOrder(products, order){
    const registers = products.map(p => ({
      order_id: order.id,
      product_id: p.product_id,
      quantity: p.quantity,
    }));
    await OrderProduct.bulkCreate(registers);
  }

  static async getOrders(clientId) {
    const orders = await Order.findAll({where: { client_id: clientId }});

    const ordersWithProducts = await Order.findAll({
        where: {
          id: orders.map(order => order.id),
        },
        include: [{
          model: Product,
          through: { attributes: ['quantity'] },
        }]
      }
    );

    return ordersWithProducts;
  }

  static async getOrdersById(id, clientId) {
    const order = await Order.findByPk(id, {
      include: [{
        model: Product,
        through: { attributes: ['quantity'] }
      }],
    });
    if(!order || order.client_id !== clientId) return null;
    
    return order;
  }

  static async cancelByClient(id, clientId){
    const order = await Order.findByPk(id, {
      include: [{
        model: Product,
        through: { attributes: ['quantity'] }
      }],
    });
    if(!order || order.client_id !== clientId) return null;

    if(order.status !== "pendente"){
      const error = new Error("Pedido só pode ser concluido caso esteja pendente");
      error.statusCode = 400;
      throw error;
    }

    await order.update({ status: "cancelado" });
    return order;
  }

  static async cancelByAdmin(id){
    const order = await Order.findByPk(id, {
      include: [{
        model: Product,
        through: { attributes: ['quantity'] }
      }],
    });
    if(!order) return null;

    if(order.status !== "pendente"){
      const error = new Error("Pedido só pode ser concluido caso esteja pendente");
      error.statusCode = 400;
      throw error;
    }

    await order.update({ status: "cancelado" });
    return order;
  }

  static async confirm(id){
    const order = await Order.findByPk(id, {
      include: [{
        model: Product,
        through: { attributes: ['quantity'] }
      }],
    });
    if(!order) return null;

    if(order.status !== "pendente"){
      const error = new Error("Pedido só pode ser concluido caso esteja pendente");
      error.statusCode = 400;
      throw error;
    }

    order.update({ status: "concluido" });
    return order;
  }
}