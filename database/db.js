import { Sequelize } from "sequelize";
import { DB_HOST, DB_NAME, DB_PASSWORD, PORT, USER } from "./config.js";

const db = new Sequelize({
  database: DB_NAME,
  username: USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: PORT,
  dialect: "mysql",
});

export default db;
