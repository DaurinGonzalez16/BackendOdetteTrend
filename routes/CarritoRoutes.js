import express from "express";
import {
  AnadirCarrito,
  AnadirCarritoModa,
  ConseguirCarrito,
  ConseguirCarritoModa,
  DisminuirCantidad,
  DisminuirCantidadModa,
  RemoverCarrito,
  RemoverCarritoModa,
  RemoverTodoCarrito,
  RemoverTodoCarritoModa,
} from "../controllers/CarritoController.js";

const router = express.Router();

router.get("/ConseguirCarrito/:userId", ConseguirCarrito);
router.post("/AnadirCarrito", AnadirCarrito);
router.post("/EliminarCarrito/:userId/:productId", RemoverCarrito);
router.post("/DisminuirCantidad/:userId/:productId", DisminuirCantidad);
router.delete("/RemoverTodoCarrito/:userId", RemoverTodoCarrito);

/*----------------------------MODA------------------------------ */
router.get("/ConseguirCarritoModa/:userId", ConseguirCarritoModa);
router.post("/AnadirCarritoModa", AnadirCarritoModa);
router.post("/EliminarCarritoModa/:userId/:productId", RemoverCarritoModa);
router.post("/DisminuirCantidadModa/:userId/:productId", DisminuirCantidadModa);
router.delete("/RemoverTodoCarritoModa/:userId", RemoverTodoCarritoModa);

export default router;
