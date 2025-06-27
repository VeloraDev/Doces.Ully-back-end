import Order from "../models/order.js";
import OrderProduct from "../models/orderProduct.js";
import Product from "../models/product.js";
import AppError from "../errors/AppError.js";

export default class OrderService {
  static async create(data){
    const { products = null, address = null } = data;
    await this.validateProducts(products);

    const order = await Order.create({ 
      ...data,
      address_neighborhood: address ? address.neighborhood : null,
      address_street: address ? address.street : null,
      address_number: address ? address.number : null,
    });
    await this.addProductOrder(products, order);

    for (const p of products) {
      const product = await Product.findByPk(p.product_id);
      await product.update({ quantity: product.quantity - p.quantity });
    }

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

    if(errors.length !== 0) {
      throw new AppError(errors, 400);
    };
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
    if(!order || order.client_id !== clientId) {
      throw new AppError("Pedido não encontrado", 404);
    };
    
    return order;
  }

  static async cancelByClient(id, clientId){
    const order = await Order.findByPk(id, {
      include: [{
        model: Product,
        through: { attributes: ['quantity'] }
      }],
    });
    if(!order || order.client_id !== clientId) {
      throw new AppError("Pedido não encontrado", 404);
    };

    if(order.status !== "pendente"){
      throw new AppError("Pedido só pode ser concluido caso esteja pendente", 400);
    }

    for(const product of order.Products){
      const quantityOrder = product.OrderProduct.quantity;

      await product.update({ quantity: product.quantity + quantityOrder });
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
    if(!order) {
      throw new AppError("Pedido não encontrado", 404);
    };

    if(order.status !== "pendente"){
      throw new AppError("Pedido só pode ser cancelado caso esteja pendente", 400);
    }

    for(const product of order.Products){
      const quantityOrder = product.OrderProduct.quantity;

      await product.update({ quantity: product.quantity + quantityOrder });
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
    if(!order) {
      throw new AppError("Pedido não encontrado", 404);
    };

    if(order.status !== "pendente"){
      throw new AppError("Pedido só pode ser concluido caso esteja pendente", 400);
    }

    order.update({ status: "concluido" });
    return order;
  }
}