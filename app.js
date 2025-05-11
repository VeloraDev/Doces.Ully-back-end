import express from "express";
import "./src/database/index.js";

import categoryRouter from "./src/routes/category.routes.js";
import clientRouter from "./src/routes/client.routes.js";
import productRouter from "./src/routes/product.routes.js";

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.app.use(express.json());
  }

  routes(){
    this.app.use("/categories/", categoryRouter);
    this.app.use("/clients/", clientRouter);
    this.app.use("/products/", productRouter);
  }
}

export default new App().app;
