import { Sequelize } from "sequelize";
import { ModaModel } from "../models/ModaModel.js";

export const MostrarCardModasType = async (req, res) => {
  const { tipo } = req.params;

  try {
    let MR_OPCIONES = {
      attributes: ["clothing_id", "image_url", "name", "price"],
      where: { type: tipo },
    };

    const MR = await ModaModel.findAll(MR_OPCIONES);
    return res.json(MR);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const MostrarCardModas = async (req, res) => {
  try {
    let MR_OPCIONES = {
      attributes: ["clothing_id", "image_url", "name", "price"],
      order: [Sequelize.literal("RAND()")],
    };

    if (req.params.limite) {
      MR_OPCIONES.limit = parseInt(req.params.limite, 10);
    }

    const MR = await ModaModel.findAll(MR_OPCIONES);

    return res.json(MR);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const MostrarProductoId = async (req, res) => {
  const { id } = req.params;

  try {
    const MRID = await ModaModel.findByPk(id);

    res.json(MRID);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

export const BuscarProductosModa = async (req, res) => {
  try {
    const { query } = req.params;

    let whereClause = {};

    if (query) {
      // Comprobamos si el parámetro es un tipo y buscamos por tipo
      whereClause[Sequelize.Op.or] = [
        { name: { [Sequelize.Op.like]: `%${query}%` } },
        { type: query },
      ];
    }

    const opcionesConsulta = {
      attributes: ["clothing_id", "image_url", "name", "price"],
      where: whereClause,
      order: [Sequelize.literal("RAND()")],
    };

    const productos = await ModaModel.findAll(opcionesConsulta);

    return res.json(productos);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// export const BuscarProductosModaType = async (req, res) => {
//   try {
//     const { query } = req.params;

//     const opcionesConsulta = {
//       attributes: ["clothing_id", "image_url", "name", "price"],
//       where: { type: query },
//       order: [Sequelize.literal("RAND()")],
//     };

//     const productos = await ModaModel.findAll(opcionesConsulta);

//     return res.json(productos);
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//     });
//   }
// };
