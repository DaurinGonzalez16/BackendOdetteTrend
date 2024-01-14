//Importamos el Modelo
import { Sequelize } from "sequelize";
import { ModelGaming } from "../models/GamingModel.js";

//MOSTRAR TODOS LOS REGISTROS GAMING
export async function MostrarRegistros(
  req,
  res,
  type = null,
  limit = null,
  oferta = "No",
  query = null
) {
  try {
    let whereClause = {};

    if (type) {
      whereClause.type = `${type}`;
    }

    if (oferta === "Si") {
      whereClause.oferta = "Si";
    }

    if (query) {
      whereClause.name = { [Sequelize.Op.like]: `%${query}%` };
    }

    const parsedLimit = parseInt(limit, 10);

    const GamingAll = await ModelGaming.findAll({
      where: whereClause,
      order: [Sequelize.literal("RAND()")],
      limit: isNaN(parsedLimit) ? null : parsedLimit,
    });

    res.json(GamingAll);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

//MOSTRAR LA PROPIEDAD NAME DE TODOS LOS REGISTROS
export async function MostrarNameRegistros(req, res) {
  try {
    const GamingAll = await ModelGaming.findAll({
      attributes: ["name"],
    });
    res.json(GamingAll);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

//MOSTRAR TODOS LOS REGISTROS EN DECUENTO
export async function MostrarRegistrosDescuento(req, res) {
  try {
    const GamingDescuento = await ModelGaming.findAll({
      where: { descuento: "Si" },
      order: [Sequelize.literal("RAND()")],
    });
    res.json(GamingDescuento);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

//MOSTRAR LAS CARACTERISTICAS DE LOS PRODUCTOS GAMING
export const MostrarRegistrosCaracteristicas = async (req, res) => {
  try {
    const Caracteristicas = await ModelGaming.findAll({
      attributes: [
        "operating_system",
        "processor",
        "memory_ram",
        "storage",
        "graphics_card",
      ],
    });
    res.json(Caracteristicas);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

//MOSTRAR UN REGISTRO POR SU ID
export const MostrarRegistro = async (req, res) => {
  try {
    const GamingbyId = await ModelGaming.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(GamingbyId[0]);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
