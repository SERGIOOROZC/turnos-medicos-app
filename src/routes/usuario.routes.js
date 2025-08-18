// src/routes/usuario.routes.js
import { Router } from "express";
import { listarUsuarios, crearUsuario } from "../controllers/usuario.controller.js";
import { validarUsuario } from "../middleware/validaciones.js";
import { autenticarJWT, autorizarRol } from "../middleware/auth.js";

const router = Router();

// 🔹 Solo los admin pueden listar usuarios
router.get("/", autenticarJWT, autorizarRol(["admin"]), listarUsuarios);

// 🔹 Cualquier persona puede registrarse (crear usuario)
router.post("/", validarUsuario, crearUsuario);

export default router;
