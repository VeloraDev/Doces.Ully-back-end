import express from "express";
import ClientController from "../controllers/client.controller.js";
import clientRequired from "../middlewares/clientAuth.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createClientSchema, updateClientSchema } from "../schemas/clientSchema.js";

const router = express.Router();

router.post("/", validateSchema(createClientSchema), ClientController.create);
router.get("/", clientRequired, ClientController.show);
router.put("/", clientRequired, validateSchema(updateClientSchema), ClientController.update);
router.delete("/", clientRequired, ClientController.delete);

export default router;