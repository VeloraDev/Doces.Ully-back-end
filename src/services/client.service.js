import { ValidationError } from "sequelize";
import Client from "../models/client.js";
import jwt from "jsonwebtoken";

export default class ClientService {
  static async create(data) {
    return await Client.create(data);
  }

  static async getClientById(id) {
    return await Client.findByPk(id);
  }

  static async update(id, data) {
    const client = await Client.findByPk(id);
    if (!client) return null;

    return await client.update(data);
  }

  static async delete(id) {
    const client = await Client.findByPk(id);
    if (!client) return null;

    await client.destroy();
    return true;
  }

  static async login(phone, password) {
    const client = await Client.findOne({ where: { phone: phone } });
    if (!client) throw new ValidationError("Credenciais inválidas");

    const pass = await client.passwordIsValid(password);
    if (!pass) throw new ValidationError("Credenciais inválidas");

    const token = jwt.sign({ id: client.id }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
    
    return token;
  }
}
