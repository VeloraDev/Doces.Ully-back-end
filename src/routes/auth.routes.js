import express from "express";
import AuthController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login/admin",  AuthController.loginAdmin);
router.post("/login/client",  AuthController.loginClient);
router.delete("/logout", AuthController.logout);

export default router;