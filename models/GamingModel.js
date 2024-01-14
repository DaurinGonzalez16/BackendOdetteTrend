//importamos la conexion a la base de datos
import db from "../database/db.js";
//Importamos Sequelize
import { DataTypes } from "sequelize";

export const ModelGaming = db.define("gaming_products", {
  //ESTAS SON LAS COLUMNAS DE MI TABLA
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  image_url: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  condition: { type: DataTypes.STRING },
  model: { type: DataTypes.STRING },
  operating_system: { type: DataTypes.STRING },
  processor: { type: DataTypes.STRING },
  memory_ram: { type: DataTypes.STRING },
  storage: { type: DataTypes.STRING },
  graphics_card: { type: DataTypes.STRING },
  image_url_1: { type: DataTypes.STRING },
  image_url_2: { type: DataTypes.STRING },
  image_url_3: { type: DataTypes.STRING },
  image_url_4: { type: DataTypes.STRING },
  price: { type: DataTypes.DOUBLE },
  stock: { type: DataTypes.NUMBER },
  oferta: { type: DataTypes.STRING },
  descuento: { type: DataTypes.STRING },
});
