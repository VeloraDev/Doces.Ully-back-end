import Client from "../models/client.js";
import jwt from "jsonwebtoken";
import AppError from "../errors/AppError.js";

export default class ClientService {
  static async create(data) {
    return await Client.create(data);
  }

  static async getClientById(id) {
    const client = await Client.findByPk(id);
    if(!client) {
      throw new AppError("Cliente não encontrado", 404);
    }
    return client;
  }

  static async update(id, data) {
    const client = await Client.findByPk(id);
    if (!client) {
      throw new AppError("Cliente não encontrado", 404);
    }
    if(data.phone){
      throw new AppError("O número de telefone não pode ser atualizado", 400);
    }

    return await client.update(data);
  }

  static async delete(id) {
    const client = await Client.findByPk(id);
    if (!client) {
      throw new AppError("Cliente não encontrado", 404);
    }
    await client.destroy();
  }

  static async login(phone, password) {
    const client = await Client.findOne({ where: { phone: phone } });
    if (!client) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const pass = await client.passwordIsValid(password);
    if (!pass) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const token = jwt.sign({ id: client.id }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
    return token;
  }
}
