import { getAll, addItem, updateItem, removeItem } from "./localStorageService";
import mockCategorias from "../data/mockCategorias.json";

const KEY = "categorias";

// Usan esto: Catalogo (filtro por categoria), Admin-Categorias, Admin-Productos (formulario)
export const listarCategorias = () => getAll(KEY, mockCategorias);
export const crearCategoria = (categoria) => addItem(KEY, categoria);
export const editarCategoria = (id, cambios) => updateItem(KEY, id, cambios);
export const eliminarCategoria = (id) => removeItem(KEY, id);
