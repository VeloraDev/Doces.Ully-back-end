import AdminService from "../services/admin.service.js";

export default class AdminController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const token = await AdminService.login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
