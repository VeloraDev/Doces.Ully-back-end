import { Sequelize } from "sequelize";
import databaseConfig from "../config/database.js";

const models = [];

const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));