import db from "../config/db.js";

export const crearUsuario = async (usuario) => {
  const { nombre, apellido, email, password, rol } = usuario;
  const [result] = await db.query(
    "INSERT INTO usuario (nombre, apellido, email, password, rol) VALUES (?, ?, ?, ?, ?)",
    [nombre, apellido, email, password, rol]
  );
  return { id_usuario: result.insertId, ...usuario };
};

export const obtenerUsuarios = async () => {
  const [rows] = await db.query("SELECT * FROM usuario");
  return rows;
};
