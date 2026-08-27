import { getAll, saveAll, removeItem } from "./localStorageService";

const KEY = "carrito";
// Cada item del carrito: { id: productoId, cantidad }
// Usamos id = productoId para poder reutilizar las funciones genericas.

export const obtenerCarrito = () => getAll(KEY, []);

export const agregarAlCarrito = (productoId, cantidad = 1) => {
  const carrito = obtenerCarrito();
  const existente = carrito.find((item) => item.id === productoId);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ id: productoId, cantidad });
  }
  saveAll(KEY, carrito);
  return carrito;
};

export const cambiarCantidad = (productoId, cantidad) => {
  const carrito = obtenerCarrito();
  const item = carrito.find((i) => i.id === productoId);
  if (item) item.cantidad = cantidad;
  saveAll(KEY, carrito);
  return carrito;
};

export const quitarDelCarrito = (productoId) => {
  removeItem(KEY, productoId);
  return obtenerCarrito();
};

export const vaciarCarrito = () => saveAll(KEY, []);
