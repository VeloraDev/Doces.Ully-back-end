import express from "express";
import AddressController from "../controllers/address.controller.js";
import clientRequired from "../middlewares/clientAuth.js";
import validateBody from "../middlewares/validateBody.js";

const router = express.Router();

router.post("/", clientRequired, validateBody, AddressController.create);
router.get("/", clientRequired, AddressController.index);
router.get("/{:id}", clientRequired, AddressController.show);
router.put("/{:id}", clientRequired, validateBody, AddressController.update);
router.delete("/{:id}", clientRequired, AddressController.delete);

export default router;
