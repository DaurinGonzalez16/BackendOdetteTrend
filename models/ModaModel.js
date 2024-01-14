import db from "../database/db.js";
import { DataTypes } from "sequelize";

export const ModaModel = db.define("clothings_products", {
  clothing_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  product_id: {
    type: DataTypes.INTEGER,
  },

  name: {
    type: DataTypes.STRING,
  },

  size: {
    type: DataTypes.STRING,
  },

  color: {
    type: DataTypes.STRING,
  },

  valoracion: {
    type: DataTypes.STRING,
  },

  image_url: {
    type: DataTypes.STRING,
  },

  image_url_1: {
    type: DataTypes.STRING,
  },

  image_url_2: {
    type: DataTypes.STRING,
  },

  image_url_3: {
    type: DataTypes.STRING,
  },

  image_url_4: {
    type: DataTypes.STRING,
  },

  price: {
    type: DataTypes.NUMBER,
  },
  stock: {
    type: DataTypes.NUMBER,
  },
});
