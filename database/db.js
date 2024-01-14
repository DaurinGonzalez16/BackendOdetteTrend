import { Sequelize } from "sequelize";
import { DB_HOST, DB_NAME, DB_PASSWORD, USER } from "./config.js";

const db = new Sequelize(DB_NAME, USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});

export default db;
