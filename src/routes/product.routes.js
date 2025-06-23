import express from "express";
import multer from "multer";
import ProductController from "../controllers/product.controller.js";
import multerCloundinaryConfig from "../config/multerCloudinary.js";
import multerErrorhandler from "../middlewares/multerErrorHandler.js";
import adminRequired from "../middlewares/adminAuth.js";

const router = express.Router();
const upload = multer(multerCloundinaryConfig);

router.post("/", adminRequired, upload.single("image"), ProductController.create, multerErrorhandler);
router.get("/", ProductController.index);
router.get("/{:id}", ProductController.show);
router.put("/{:id}", adminRequired, upload.single("image"), ProductController.update, multerErrorhandler);
router.delete("/{:id}", adminRequired, ProductController.delete);

export default router;
