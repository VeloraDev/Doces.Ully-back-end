import express from "express";
import ClientController from "../controllers/client.controller.js";
import clientRequired from "../middlewares/clientAuth.js";

const router = express.Router();

router.post("/login", ClientController.login);
router.post("/", ClientController.create);
router.get("/", clientRequired, ClientController.show);
router.put("/", clientRequired, ClientController.update);
router.delete("/", clientRequired, ClientController.delete);

export default router;