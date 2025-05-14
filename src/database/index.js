import { Sequelize } from "sequelize";
import databaseConfig from "../config/database.js";
import Category from "../models/category.js";
import Client from "../models/client.js";
import Product from "../models/product.js";
import Address from "../models/address.js";
import Admin from "../models/admin.js";

const models = [Category, Client, Product, Address, Admin];

const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));
models.forEach((model) => {
  if(model.associate){
    model.associate(connection.models);
  }
});
