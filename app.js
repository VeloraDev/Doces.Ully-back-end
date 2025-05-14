import express from "express";
import path from "path";
import "./src/database/index.js";

import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import categoryRouter from "./src/routes/category.routes.js";
import clientRouter from "./src/routes/client.routes.js";
import productRouter from "./src/routes/product.routes.js";
import addressRouter from "./src/routes/address.routes.js";
import adminRouter from "./src/routes/admin.routes.js";

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
  }

  routes(){
    this.app.use("/categories/", categoryRouter);
    this.app.use("/clients/", clientRouter);
    this.app.use("/products/", productRouter);
    this.app.use("/addresses/", addressRouter);
    this.app.use("/admin/", adminRouter);
  }
}

export default new App().app;
