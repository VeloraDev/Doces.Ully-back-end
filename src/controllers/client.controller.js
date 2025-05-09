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
}
