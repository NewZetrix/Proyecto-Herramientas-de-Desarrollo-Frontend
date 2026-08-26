import { getAll, addItem, updateItem, removeItem } from "./localStorageService";
import mockUsuarios from "../data/mockUsuarios.json";

const KEY_USUARIOS = "usuarios";
const KEY_SESION = "sesion"; // guarda solo el id del usuario logueado

// Usan esto: Login, Registro, Perfil, Navbar (para saber si hay sesion), rutas protegidas
export const listarUsuarios = () => getAll(KEY_USUARIOS, mockUsuarios);

export const login = (correo, password) => {
  const usuario = listarUsuarios().find((u) => u.correo === correo && u.password === password);
  if (!usuario) return { ok: false, error: "Correo o contrasena incorrectos" };
  localStorage.setItem(KEY_SESION, JSON.stringify(usuario.id));
  return { ok: true, usuario };
};

export const registrar = (datos) => {
  const yaExiste = listarUsuarios().some((u) => u.correo === datos.correo);
  if (yaExiste) return { ok: false, error: "Ese correo ya esta registrado" };
  const nuevo = addItem(KEY_USUARIOS, { ...datos, rol: "cliente", estado: "activo" });
  localStorage.setItem(KEY_SESION, JSON.stringify(nuevo.id));
  return { ok: true, usuario: nuevo };
};

export const cerrarSesion = () => localStorage.removeItem(KEY_SESION);

// Devuelve el usuario logueado actualmente, o null si no hay sesion.
export const usuarioActual = () => {
  const raw = localStorage.getItem(KEY_SESION);
  if (!raw) return null;
  const id = JSON.parse(raw);
  return listarUsuarios().find((u) => u.id === id) ?? null;
};

export const estaLogueado = () => usuarioActual() !== null;
export const esAdmin = () => usuarioActual()?.rol === "admin";

// Usan esto: Perfil (editar datos / cambiar contrasena)
export const actualizarPerfil = (id, cambios) => updateItem(KEY_USUARIOS, id, cambios);

// Usan esto: Admin-Usuarios
export const cambiarRolOEstado = (id, cambios) => updateItem(KEY_USUARIOS, id, cambios);
export const eliminarUsuario = (id) => removeItem(KEY_USUARIOS, id);
