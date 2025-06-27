import express from "express";
import ProductController from "../controllers/product.controller.js";
import multerErrorhandler from "../middlewares/multerErrorHandler.js";
import adminRequired from "../middlewares/adminAuth.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createProductSchema, updateProductSchema } from "../schemas/productSchema.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/", adminRequired, upload.single("image"), validateSchema(createProductSchema), ProductController.create, multerErrorhandler);
router.get("/", ProductController.index);
router.get("/{:id}", ProductController.show);
router.put("/{:id}", adminRequired, upload.single("image"), validateSchema(updateProductSchema), ProductController.update, multerErrorhandler);
router.delete("/{:id}", adminRequired, ProductController.delete);

export default router;
