import express from "express";
import AdminController from "../controllers/admin.controller.js";
import validateBody from "../middlewares/validateBody.js";

const router = express.Router();

router.post("/login", validateBody, AdminController.login);

export default router;