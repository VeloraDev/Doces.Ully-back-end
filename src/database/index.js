import { Sequelize } from "sequelize";
import databaseConfig from "../config/database.js";
import Category from "../models/category.js";
import Client from "../models/client.js";

const models = [Category, Client];

const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));