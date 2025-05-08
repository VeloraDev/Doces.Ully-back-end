import express from "express";
import dotenv from "dotenv";
import "./src/database/index.js";
import categoryRouter from "./src/routes/category.routes.js";

dotenv.config();

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
