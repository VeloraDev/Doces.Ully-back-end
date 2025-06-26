import express from "express";
import CategoryController from "../controllers/category.controller.js";
import adminRequired from "../middlewares/adminAuth.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createCategorySchema, updateCategorySchema } from "../schemas/categorySchema.js";

const router = express.Router();

router.post("/", adminRequired, validateSchema(createCategorySchema), CategoryController.create);
router.get("/", CategoryController.index);
router.get("/{:id}", CategoryController.show);
router.get("/{:id}/products", CategoryController.showProducts);
router.put("/{:id}", validateSchema(updateCategorySchema), adminRequired, CategoryController.update);
router.delete("/{:id}", adminRequired, CategoryController.delete);

export default router;
