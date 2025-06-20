import Admin from "../models/admin.js";
import Client from "../models/client.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AppError from "../errors/AppError.js";
dotenv.config();

export default class AuthService {
  static async loginAdmin(email, password) {
    const admin = await Admin.findOne({ where: { email: email } });
    if(!admin){
      throw new AppError("Credenciais inválidas", 401);
    }

    const pass = await admin.passwordIsValid(password);
    if(!pass) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const token = jwt.sign({ id: admin.id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
    return token;
  }

  static async loginClient(phone, password) {
    const client = await Client.findOne({ where: { phone: phone } });
    if (!client) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const pass = await client.passwordIsValid(password);
    if (!pass) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const token = jwt.sign({ id: client.id, role: "client" }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
    return token;
  }
}