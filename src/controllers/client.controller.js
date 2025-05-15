import { ValidationError } from "sequelize";
import ClientService from "../services/client.service.js";

export default class ClientController {
  static async create(req, res) {
    try {
      const client = await ClientService.create(req.body);
      return res.status(201).json(client);
    } catch (error) {
      if (error instanceof ValidationError) {
        const messages = error.errors.map((err) => err.message);
        return res.status(400).json({
          errors: messages,
        });
      }

      console.log(error);
      return res.status(500).json({
        message: "Erro interno no servidor",
      });
    }
  }

  static async show(req, res) {
    try {
      const client = await ClientService.getClientById(req.clientId);
      if (!client) {
        return res.status(404).json({
          message: "Cliente não encontrado",
        });
      }

      return res.status(200).json(client);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro interno no servidor",
      });
    }
  }

  static async update(req, res) {
    try {
      const client = await ClientService.update(req.clientId, req.body);
      if (!client) {
        return res.status(404).json({
          message: "Cliente não encontrado",
        });
      }

      return res.status(200).json(client);
    } catch (error) {
      if (error instanceof ValidationError) {
        const messages = error.errors.map((err) => err.message);
        return res.status(400).json({
          errors: messages,
        });
      }

      console.log(error);
      return res.status(500).json({
        message: "Erro interno no servidor",
      });
    }
  }

  static async delete(req, res) {
    try {
      const clientDestroy = await ClientService.delete(req.clientId);
      if (!clientDestroy) {
        return res.status(404).json({
          message: "Cliente não encontrado",
        });
      }

      return res.status(204).json();
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro interno no servidor",
      });
    }
  }

  static async login(req, res){
    try {
      const { phone, password } = req.body;
      const token = await ClientService.login(phone, password);
      res.status(200).json({ token });
    } catch (error) {
      if(error instanceof ValidationError){
        return res.status(400).json({
          error: error.message,
        });
      }

      return res.status(500).json({
        message: "erro interno no servidor",
      });
    }
  }
}
