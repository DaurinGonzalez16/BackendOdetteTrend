import { Sequelize } from "sequelize";
import { DB_HOST, DB_NAME, DB_PASSWORD, PORT, USER } from "./config.js";
import mysql2 from "mysql2";

const db = new Sequelize({
  database: DB_NAME,
  username: USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: PORT,
  dialect: "mysql",
  dialectModule: mysql2,
});

export default db;
