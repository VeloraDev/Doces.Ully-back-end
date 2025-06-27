import express from "express";
import AddressController from "../controllers/address.controller.js";
import clientRequired from "../middlewares/clientAuth.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createAddressSchema, updateAddressSchema } from "../schemas/addressSchema.js";

const router = express.Router();

router.post("/", clientRequired, validateSchema(createAddressSchema), AddressController.create);
router.get("/", clientRequired, AddressController.index);
router.get("/{:id}", clientRequired, AddressController.show);
router.put("/{:id}", clientRequired, validateSchema(updateAddressSchema), AddressController.update);
router.delete("/{:id}", clientRequired, AddressController.delete);

export default router;
