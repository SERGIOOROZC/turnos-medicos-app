// src/controllers/usuario.controller.js
import db from "../config/db.js";

// Listar todos los usuarios
export const listarUsuarios = async (req, res) => {
  try {
    const [usuarios] = await db.query("SELECT * FROM usuario");
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo usuario
export const crearUsuario = async (req, res) => {
  try {
    const { nombre, apellido, email, password, rol } = req.body;
    const [result] = await db.query(
      "INSERT INTO usuario (nombre, apellido, email, password, rol) VALUES (?, ?, ?, ?, ?)",
      [nombre, apellido, email, password, rol]
    );
    res.status(201).json({ id_usuario: result.insertId, nombre, apellido, email, rol });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
