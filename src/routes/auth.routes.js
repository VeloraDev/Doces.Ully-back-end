import express from "express";
import AuthController from "../controllers/auth.controller.js";
import validateBody from "../middlewares/validateBody.js";

const router = express.Router();

router.post("/login/admin", validateBody, AuthController.loginAdmin);
router.post("/login/client", validateBody, AuthController.loginClient);
router.delete("/logout", AuthController.logout);

export default router;