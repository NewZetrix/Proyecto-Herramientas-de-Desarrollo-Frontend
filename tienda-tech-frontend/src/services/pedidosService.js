import { getAll, getById, addItem, updateItem } from "./localStorageService";
import mockPedidos from "../data/mockPedidos.json";
import { generarId } from "./localStorageService";

const KEY = "pedidos";

// Usan esto: Checkout (crear pedido), Historial/Detalle de pedido (cliente), Admin-Pedidos
export const listarPedidos = () => getAll(KEY, mockPedidos);

export const listarPedidosDeUsuario = (usuarioId) =>
  listarPedidos().filter((p) => p.usuarioId === usuarioId);

export const obtenerPedido = (id) => getById(KEY, id);

export const crearPedido = ({ usuarioId, items, direccionEnvio, metodoPago }) => {
  const total = items.reduce((acc, i) => acc + i.precioUnitario * i.cantidad, 0);
  return addItem(KEY, {
    id: generarId(),
    usuarioId,
    items,
    direccionEnvio,
    metodoPago,
    estado: "pendiente",
    fecha: new Date().toISOString().slice(0, 10),
    total,
  });
};

// Usan esto: Admin-Pedidos
export const actualizarEstadoPedido = (id, estado) => updateItem(KEY, id, { estado });
