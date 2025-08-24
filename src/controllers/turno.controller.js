// D. las funciones {obtenerTurnos,crearTurno,eliminarTurno} estan en models que se conecta a bd

import { obtenerTurnos, crearTurno, eliminarTurno } from "../models/turno.models.js";



// C. router pide GET/turno  y el controller hace la function obtenerTurno() se conecta a bd
// con sql hace la sentencia SELECT * from usuario y devuelve datos

export const listarTurnos = async (req, res) => {
  try {
    const turnos = await obtenerTurnos();
    res.json(turnos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const nuevoTurno = async (req, res) => {
  try {
    const turno = await crearTurno(req.body);
    res.status(201).json(turno);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const borrarTurno = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await eliminarTurno(id);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
