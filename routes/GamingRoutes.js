import express from "express";
import {
  MostrarNameRegistros,
  MostrarRegistro,
  MostrarRegistros,
  MostrarRegistrosCaracteristicas,
  MostrarRegistrosDescuento,
} from "../controllers/ZonaGamingController.js";

const router = express.Router();
/*----------------------------------------------------------*/
/*RUTA DEFAULT*/
router.get("/", MostrarNameRegistros);
/*RUTA BUSCAR*/
router.get("/buscar/:query", (req, res) => {
  const { query } = req.params;
  MostrarRegistros(req, res, null, null, "No", query);
});
/*RUTA PARA LAS OFERTAS CON O SIN LIMITES */
router.get("/oferta/:limit?", (req, res) => {
  const oferta = "Si";
  const limit = req.params.limit || 5;
  MostrarRegistros(req, res, null, limit, oferta);
});
/*RUTA SOBRE EL DESCUENTO */
router.get("/Descuento", MostrarRegistrosDescuento);
/*RUTA SOBRE LAS CARACTERISTICAS */
router.get("/caracteristicas", MostrarRegistrosCaracteristicas);
/*RUTA MOSTRAR UN PRODUCTO POR ID - GAMING */
router.get("/:id", MostrarRegistro);
/*RUTA PARA LOS TIPOS SOLOS O CON LIMITES*/
router.get("/tipo/:type?", (req, res) => {
  const { type } = req.params;
  const { limit } = req.query;
  MostrarRegistros(req, res, type, limit);
});
/*RUTA SOLA PARA EL LIMITE */
router.get("/limite/:limit?", (req, res) => {
  const { limit } = req.params;
  MostrarRegistros(req, res, null, limit);
});
/*----------------------------------------------------------*/

export default router;
