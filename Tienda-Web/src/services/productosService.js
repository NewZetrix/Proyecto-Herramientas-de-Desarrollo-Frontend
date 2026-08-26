import { getAll, getById, addItem, updateItem, removeItem } from "./localStorageService";
import mockProductos from "../data/mockProductos.json";

const KEY = "productos";

// Usan esto: Catalogo (exploracion y detalle), Carrito, Admin-Productos
export const listarProductos = () => getAll(KEY, mockProductos);

export const obtenerProducto = (id) => getById(KEY, id);

export const buscarProductos = ({ texto, categoriaId, precioMax } = {}) => {
  let resultado = listarProductos();
  if (texto) {
    resultado = resultado.filter((p) => p.nombre.toLowerCase().includes(texto.toLowerCase()));
  }
  if (categoriaId) {
    resultado = resultado.filter((p) => p.categoriaId === categoriaId);
  }
  if (precioMax) {
    resultado = resultado.filter((p) => p.precio <= precioMax);
  }
  return resultado;
};

// Usan esto: Admin-Productos
export const crearProducto = (producto) => addItem(KEY, producto);
export const editarProducto = (id, cambios) => updateItem(KEY, id, cambios);
export const eliminarProducto = (id) => removeItem(KEY, id);
