import express from "express";
import multer from "multer";
import ProductController from "../controllers/product.controller.js";
import multerConfig from "../config/multer.js";
import multerErrorhandler from "../middlewares/multerErrorHandler.js";

const router = express.Router();
const upload = multer(multerConfig);

router.post("/", upload.single("image"), ProductController.create, multerErrorhandler);
router.get("/", ProductController.index);
router.get("/{:id}", ProductController.show);
router.put("/{:id}", ProductController.update);
router.delete("/{:id}", ProductController.delete);

export default router;
