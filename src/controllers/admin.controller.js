import { ValidationError } from "sequelize";
import AdminService from "../services/admin.service.js";

export default class AdminController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await AdminService.login(email, password);
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
