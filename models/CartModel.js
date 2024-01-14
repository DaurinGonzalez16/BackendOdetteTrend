//importamos la conexion a la base de datos
import db from "../database/db.js";
//Importamos Sequelize
import { DataTypes } from "sequelize";
import { ModelGaming } from "../models/GamingModel.js";
import { ModaModel } from "../models/ModaModel.js";

export const Cart = db.define("carts", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

export const CartItem = db.define("cart_items", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  cart_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export const CartItemModa = db.define("cart_items_clothings", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cart_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

/*MODA*/
CartItemModa.belongsTo(Cart, { foreignKey: "cart_id" });
CartItemModa.belongsTo(ModaModel, { foreignKey: "product_id" });

/*GAMING*/
CartItem.belongsTo(Cart, { foreignKey: "cart_id" });
CartItem.belongsTo(ModelGaming, { foreignKey: "product_id" });
