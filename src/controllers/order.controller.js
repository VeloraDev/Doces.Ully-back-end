import OrderService from "../services/order.service.js";

function orderParse(order) {
  return {
    id: order.id,
    status: order.status,
    payment_method: order.payment_method,
    is_pickup: order.is_pickup,
    address: order.is_pickup ? null : {
      neighborhood: order.address_neighborhood,
      street: order.address_street,
      number: order.address_number,
    },
    createdAt: order.createdAt,
    products: order.Products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.OrderProduct.quantity,
      subtotal: product.OrderProduct.quantity * product.price,
    })),
    totalPrice: order.Products.reduce((acc, product) => {
      return acc + product.OrderProduct.quantity * product.price;
    }, 0)
  };
}

export default class OrderController {
  static async create(req, res, next) {
    try {
      const order = await OrderService.create({
        ...req.body,
        client_id: req.clientId,
      });

      return res.status(201).json(orderParse(order));
    } catch (error) {
      next(error);
    }
  }

  static async index(req, res, next) {
    try {
      const orders = await OrderService.getOrders(req.clientId);
      res.status(200).json(
        orders.map((order) => {
          return orderParse(order);
        })
      );
    } catch (error) {
      next(error);
    }
  }

  static async show(req, res, next) {
    try {
    const order = await OrderService.getOrdersById(req.params.id, req.clientId);
    return res.status(200).json(orderParse(order));
    } catch (error) {
      next(error);
    }
  }

  static async cancelByClient(req, res, next) {
    try {
      const order = await OrderService.cancelByClient(
        req.params.id,
        req.clientId
      );
      return res.status(200).json(orderParse(order));
    } catch (error) {
      next(error);
    }
  }

  static async cancelByAdmin(req, res, next) {
    try {
      const order = await OrderService.cancelByAdmin(req.params.id);
      return res.status(200).json(orderParse(order));
    } catch (error) {
      next(error);
    }
  }

  static async confirm(req, res, next) {
    try {
      const order = await OrderService.confirm(req.params.id);
      return res.status(200).json(orderParse(order));
    } catch (error) {
      next(error);
    }
  }
}
