import { Sequelize } from "sequelize";
import databaseConfig from "../config/database.js";
import Category from "../models/category.js";

const models = [Category];

const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));