import express from "express";
import path from "path";
import "./src/database/index.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import categoryRouter from "./src/routes/category.routes.js";
import clientRouter from "./src/routes/client.routes.js";
import productRouter from "./src/routes/product.routes.js";
import addressRouter from "./src/routes/address.routes.js";
import adminRouter from "./src/routes/admin.routes.js";
import orderRouter from "./src/routes/order.routes.js";

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));
    this.app.use(cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    }));
  }

  routes(){
    this.app.use("/categories/", categoryRouter);
    this.app.use("/clients/", clientRouter);
    this.app.use("/products/", productRouter);
    this.app.use("/addresses/", addressRouter);
    this.app.use("/admin/", adminRouter);
    this.app.use("/orders/", orderRouter);
  }
}

export default new App().app;
