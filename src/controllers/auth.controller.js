import { createCookieConfig, deleteCookieConfig } from "../config/cookies.js";
import AuthService from "../services/auth.service.js";

export default class AuthController {
  static async loginAdmin(req, res, next) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.loginAdmin(email, password);
      res.cookie("token", token, createCookieConfig);
      res.status(200).json({ message: "Administrador logado com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  static async loginClient(req, res, next){
    try {
      const { phone, password } = req.body;
      const token = await AuthService.loginClient(phone, password);
      res.cookie("token", token, createCookieConfig);
      res.status(200).json({ message: "Cliente logado com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res){
    if(!req.cookies.token){
      return res.status(401).json({
        errors: ["Precisa estar logado para efetuar o logout"],
      });
    }

    res.clearCookie("token", deleteCookieConfig);
    res.status(200).json({ message: "Logout efetuado com sucesso" });
  }
}
