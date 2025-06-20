import express from "express";
import ClientController from "../controllers/client.controller.js";
import clientRequired from "../middlewares/clientAuth.js";
import validateBody from "../middlewares/validateBody.js";

const router = express.Router();

router.post("/", validateBody, ClientController.create);
router.get("/", clientRequired, ClientController.show);
router.put("/", clientRequired, validateBody, ClientController.update);
router.delete("/", clientRequired, ClientController.delete);

export default router;