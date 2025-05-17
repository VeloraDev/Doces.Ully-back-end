import express from "express";
import CategoryController from "../controllers/category.controller.js";
import adminRequired from "../middlewares/adminAuth.js";

const router = express.Router();

router.post("/", adminRequired, CategoryController.create);
router.get("/", CategoryController.index);
router.get("/{:id}", CategoryController.show);
router.put("/{:id}", adminRequired, CategoryController.update);
router.delete("/{:id}", adminRequired, CategoryController.delete);

export default router;
