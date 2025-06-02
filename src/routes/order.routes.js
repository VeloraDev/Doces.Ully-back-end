import express from "express";
import OrderController from "../controllers/order.controller.js";
import clientRequired from "../middlewares/clientAuth.js";
import validateBody from "../middlewares/validateBody.js";
import adminRequired from "../middlewares/adminAuth.js";

const router = express.Router();

router.post("/", clientRequired, validateBody, OrderController.create);
router.get("/", clientRequired, OrderController.index);
router.get("/{:id}", clientRequired, OrderController.show);
router.patch("/{:id}/cancel/client", clientRequired, OrderController.cancelByClient);
router.patch("/{:id}/cancel/admin", adminRequired, OrderController.cancelByAdmin);
router.patch("/{:id}/confirm", adminRequired, OrderController.confirm);

export default router;