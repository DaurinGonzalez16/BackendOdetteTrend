import express from "express";
import cors from "cors";
// Importamos la Conexion a la base de datos
import db from "./database/db.js";
// Importamos el Enrutador
import GamingRoutes from "./routes/GamingRoutes.js";
import LoginRoutes from "./routes/LoginRoutes.js";
import CarritoRoutes from "./routes/CarritoRoutes.js";
import ModaRoutes from "./routes/ModaRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/Gaming", GamingRoutes);
app.use("/Login", LoginRoutes);
app.use("/Carrito", CarritoRoutes);
app.use("/Moda", ModaRoutes);

try {
  await db.authenticate();
  console.log("Conexion Exitosa a la DB");
} catch (error) {
  console.log(`Conexion Fallida a la DB: ${error}`);
}

app.get("/", (req, res) => {
  res.send("Hola Mundo");
});

app.listen(8000, () => {
  console.log(`Server UP running in http://localhost:8000/`);
});
