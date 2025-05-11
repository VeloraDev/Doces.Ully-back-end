import express from "express";
import ProductController from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", ProductController.create);
router.get("/", ProductController.index);
router.get("/{:id}", ProductController.show);
router.put("/{:id}", ProductController.update);
router.delete("/{:id}", ProductController.delete);

export default router;
