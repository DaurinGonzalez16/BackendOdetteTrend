import express from "express";
import {
  ActualizarNombreUsuario,
  IniciarSesion,
  Registrarse,
} from "../controllers/LoginController.js";

const router = express.Router();

router.post("/Registro", Registrarse);
router.post("/usuario/IniciarSesion", IniciarSesion);
router.put("/ActualizarNombre/:id/:nombrenuevo", ActualizarNombreUsuario);

export default router;
