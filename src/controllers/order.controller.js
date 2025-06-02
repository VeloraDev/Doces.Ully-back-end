import { ValidationError } from "sequelize";
import OrderService from "../services/order.service.js";

function orderParse(order) {
  return {
    id: order.id,
    status: order.status,
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
  static async create(req, res) {
    try {
      const order = await OrderService.create({
        ...req.body,
        client_id: req.clientId,
      });

      return res.status(201).json(orderParse(order));
    } catch (error) {
      if (error instanceof ValidationError) {
        const messages = error.errors.map((err) => err.message);
        return res.status(400).json({
          errors: messages,
        });
      }

      console.log(error.message);
      return res.status(500).json({
        message: "Erro interno no servidor",
      });
    }
  }

  static async index(req, res) {
    const orders = await OrderService.getOrders(req.clientId);
    res.status(200).json(
      orders.map((order) => {
        return orderParse(order);
      })
    );
  }

  static async show(req, res) {
    const order = await OrderService.getOrdersById(req.params.id, req.clientId);
    if (!order) {
      return res.status(404).json({
        message: "Pedido não encontrado",
      });
    }

    return res.status(200).json(orderParse(order));
  }

  static async cancelByClient(req, res) {
    try {
      const order = await OrderService.cancelByClient(
        req.params.id,
        req.clientId
      );
      if (!order) {
        return res.status(404).json({
          message: "Pedido não encontrado",
        });
      }

      return res.status(200).json(orderParse(order));
    } catch (error) {
      if (error.statusCode) {
        return res.status(error.statusCode).json({
          error: error.message,
        });
      }

      console.log(error);
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  }

  static async cancelByAdmin(req, res) {
    try {
      const order = await OrderService.cancelByAdmin(req.params.id);
      if (!order) {
        return res.status(404).json({
          message: "Pedido não encontrado",
        });
      }

      return res.status(200).json(orderParse(order));
    } catch (error) {
      if (error.statusCode) {
        return res.status(error.statusCode).json({
          error: error.message,
        });
      }

      console.log(error);
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  }

  static async confirm(req, res) {
    try {
      const order = await OrderService.confirm(req.params.id);
      if (!order) {
        return res.status(404).json({
          message: "Pedido não encontrado",
        });
      }

      return res.status(200).json(orderParse(order));
    } catch (error) {
      if (error.statusCode) {
        return res.status(error.statusCode).json({
          error: error.message,
        });
      }

      console.log(error);
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  }
}
