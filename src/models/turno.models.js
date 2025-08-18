import db from "../config/db.js";

export const obtenerTurnos = async () => {
  const [rows] = await db.query("SELECT * FROM turno");
  return rows;
};

export const crearTurno = async (turno) => {
  const { id_paciente, id_medico, fecha, hora, estado, observaciones } = turno;
  const [result] = await db.query(
    "INSERT INTO turno (id_paciente, id_medico, fecha, hora, estado, observaciones) VALUES (?, ?, ?, ?, ?, ?)",
    [id_paciente, id_medico, fecha, hora, estado, observaciones]
  );
  return { id_turno: result.insertId, ...turno };
};

export const eliminarTurno = async (id_turno) => {
  await db.query("DELETE FROM turno WHERE id_turno = ?", [id_turno]);
  return { mensaje: "Turno eliminado" };
};
