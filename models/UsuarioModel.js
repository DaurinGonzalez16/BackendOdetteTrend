import db from "../database/db.js";
//Importamos Sequelize
import { DataTypes } from "sequelize";

export const Usuarios = db.define("users", {
  username: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  first_name: { type: DataTypes.STRING },
  last_name: { type: DataTypes.STRING },
  address: { type: DataTypes.STRING },
});
