import express from "express";
import "./src/database/index.js";
import categoryRouter from "./src/routes/category.routes.js";

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
  }
}

export default new App().app;
