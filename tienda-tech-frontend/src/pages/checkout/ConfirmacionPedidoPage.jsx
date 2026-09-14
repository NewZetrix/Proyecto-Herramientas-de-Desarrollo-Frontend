import { Link, Navigate, useLocation } from "react-router-dom";
import { obtenerPedido } from "../../services/pedidosService";
import { obtenerProducto } from "../../services/productosService";

export default function ConfirmacionPedidoPage() {
  const location = useLocation();
  const pedidoId = location.state?.pedidoId;
  const pedido = pedidoId ? obtenerPedido(pedidoId) : null;

  // Si alguien llega aqui directo (sin pasar por Checkout), no hay nada que mostrar.
  if (!pedido) {
    return <Navigate to="/catalogo" replace />;
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
      <div className="card p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
          ✓
        </div>
        <h1 className="mt-4 text-2xl">¡Pedido confirmado!</h1>
        <p className="mt-2 text-sm text-slate-500">
          Tu pedido <strong>#{pedido.id}</strong> fue registrado correctamente.
        </p>

        <div className="mt-6 space-y-2 text-left text-sm text-slate-600">
          {pedido.items.map((item) => {
            const producto = obtenerProducto(item.productoId);
            return (
              <div key={item.productoId} className="flex justify-between gap-2">
                <span>
                  {producto?.nombre ?? "Producto"} × {item.cantidad}
                </span>
                <span className="shrink-0">
                  S/ {(item.precioUnitario * item.cantidad).toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 text-lg font-semibold text-brand-800">
          <span>Total</span>
          <span>S/ {pedido.total.toFixed(2)}</span>
        </div>

        <Link to="/catalogo" className="btn-primary mt-8 inline-flex">
          Seguir comprando
        </Link>
      </div>
    </div>
  );
}
