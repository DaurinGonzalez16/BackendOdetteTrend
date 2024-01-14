import express from "express";
import {
  BuscarProductosModa,
  MostrarCardModas,
  MostrarCardModasType,
  MostrarProductoId,
} from "../controllers/ZonaModaController.js";

const router = express.Router();

router.get("/CardModaType/:tipo?", MostrarCardModasType);
router.get("/CardModaName/:name/:limite?", MostrarCardModas);
router.get("/CardModaid/:id", MostrarProductoId);
router.get("/CardModabuscar/:query", BuscarProductosModa);

export default router;
