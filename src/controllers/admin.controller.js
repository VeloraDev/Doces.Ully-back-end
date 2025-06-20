import AdminService from "../services/admin.service.js";

export default class AdminController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const token = await AdminService.login(email, password);
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 604800000,
      });
      res.status(200).json({ message: "Administrador logado com sucesso" });
    } catch (error) {
      next(error);
    }
  }
}
