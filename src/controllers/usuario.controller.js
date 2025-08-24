
// src/controllers/usuario.controller.js
import db from "../config/db.js";
import jwt from "jsonwebtoken";
import { SECRET } from "../middleware/auth.js";
import bcrypt from "bcrypt";


// Listar todos los usuarios
export const listarUsuarios = async (req, res) => {
  try {
    const [usuarios] = await db.query("SELECT * FROM usuario");
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo usuario con contraseña encriptada
export const crearUsuario = async (req, res) => {
  try {
    const { nombre, apellido, email, password, rol } = req.body;

    // 1) Generar hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10); // 10 = "salt rounds"

    // 2) Guardar en BD con la contraseña cifrada
    const [result] = await db.query(
      "INSERT INTO usuario (nombre, apellido, email, password, rol) VALUES (?, ?, ?, ?, ?)",
      [nombre, apellido, email, hashedPassword, rol]
    );

    res.status(201).json({ id_usuario: result.insertId, nombre, apellido, email, rol });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login de usuario con verificacion de hash
export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    //buscar usuario
    const [rows] = await db.query(
      "SELECT id_usuario, nombre, apellido, email, password, rol FROM usuario WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const usuario = rows[0];

    // 2) Verificar contraseña usando bcrypt
     const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
    
    // 3) Generar token JWT
    const token = jwt.sign(
      { id: usuario.id_usuario, rol: usuario.rol },
      SECRET,
      { expiresIn: "1h" }
    );
    
    // 4)Respuesta
    res.json({
      mensaje: "Login exitoso",
      token,
      usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error en el login" });
  }
};
