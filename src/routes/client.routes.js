import express from "express";
import ClientController from "../controllers/client.controller.js";

const router = express.Router();

router.post("/", ClientController.create);
router.get("/{:id}", ClientController.show);
router.put("/{:id}", ClientController.update);
router.delete("/{:id}", ClientController.delete);

export default router;