import express from "express";
import AddressController from "../controllers/address.controller.js";

const router = express.Router();

router.post("/", AddressController.create);
router.get("/", AddressController.index);
router.get("/{:id}", AddressController.show);
router.put("/{:id}", AddressController.update);
router.delete("/{:id}", AddressController.delete);

export default router;
