import { ValidationError } from "sequelize";
import Admin from "../models/admin.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default class AdminService {
  static async login(email, password) {
    const admin = await Admin.findOne({ where: { email: email } });
    if(!admin){
      throw new ValidationError("Credenciais inválidas");
    }

    const pass = await admin.passwordIsValid(password);
    if(!pass) throw new ValidationError("Credenciais inválidas");

    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });

    return token;
  }
}