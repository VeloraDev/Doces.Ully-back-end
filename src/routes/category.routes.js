import express from "express";
import CategoryController from "../controllers/category.controller.js";

const router = express.Router();

router.post("/", CategoryController.create);

export default router;