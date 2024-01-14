import { Usuarios } from "../models/UsuarioModel.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

/*CREAR USUARIOS - REGISTRASE */
export const Registrarse = async (req, res) => {
  try {
    const { username, password, email, first_name, last_name, address } =
      req.body;

    if (
      !username ||
      !password ||
      !email ||
      !first_name ||
      !last_name ||
      !address
    ) {
      return res.status(400).json({ message: "Debe llenar todos los Campos" });
    }

    const verificarusername = await Usuarios.findOne({
      where: { username: username },
    });

    if (verificarusername) {
      return res.json({ message: "El nombre de usuario ya existe" });
    }

    // Hash y salt de la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(password, 10);

    await Usuarios.create({ ...req.body, password: hashedPassword });
    res.json({ message: "Usuario Registrado" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

/*VERIFICAR USUARIO - INICIAR SESION*/
export const IniciarSesion = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Realiza la validación de los datos antes de la consulta
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Correo electrónico y contraseña son obligatorios" });
    }

    const usuarioEncontrado = await Usuarios.findOne({
      where: {
        email: email,
        password: password,
      },
    });

    if (usuarioEncontrado) {
      const token = Jwt.sign(
        {
          id: usuarioEncontrado.id,
          nombre: usuarioEncontrado.username,
        },
        "Stack",
        {
          expiresIn: "1h",
        }
      );

      // Envía el token como parte de la respuesta
      return res.status(200).json({
        token: token,
        message: "Inicio de sesión exitoso",
      });
    } else {
      return res.json({ message: "Usuario no encontrado en la base de datos" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al verificar el usuario en la base de datos" });
  }
};

/*ACTUALIZAR NOMBRE EN LA BASE DE DATOS*/
export const ActualizarNombreUsuario = async (req, res) => {
  const { id, nombrenuevo } = req.params;

  try {
    const [nuevoNombre] = await Usuarios.update(
      { username: nombrenuevo },
      { where: { id: id } }
    );

    if (nuevoNombre === 1) {
      res.status(200).json({ mensaje: "Nombre cambiado correctamente" });
    } else {
      res.status(404).json({ mensaje: "ID no encontrado" });
    }
  } catch (error) {
    console.log("Ha Ocurrido un Erro al Actualizar", error);
    res
      .status(500)
      .json({ mensaje: "Error interno del servidor al actualizar" });
  }
};
