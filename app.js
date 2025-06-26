import express from "express";
import "./src/database/index.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
dotenv.config();

import categoryRouter from "./src/routes/category.routes.js";
import clientRouter from "./src/routes/client.routes.js";
import productRouter from "./src/routes/product.routes.js";
import addressRouter from "./src/routes/address.routes.js";
import orderRouter from "./src/routes/order.routes.js";
import authRouter from "./src/routes/auth.routes.js";

import errorHandler from "./src/middlewares/errorHandler.js";

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.errorHandlers();
  }

  middlewares(){
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    }));
    this.app.use(cookieParser());
    this.app.use(helmet());
  }

  routes(){
    this.app.use("/categories/", categoryRouter);
    this.app.use("/clients/", clientRouter);
    this.app.use("/products/", productRouter);
    this.app.use("/addresses/", addressRouter);
    this.app.use("/orders/", orderRouter);
    this.app.use("/auth/", authRouter);
  }

  errorHandlers(){
    this.app.use(errorHandler);
  }
}

export default new App().app;
