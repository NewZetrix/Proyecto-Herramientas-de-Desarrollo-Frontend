import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { obtenerPedido, actualizarEstadoPedido } from "../../../services/pedidosService";
import { listarUsuarios } from "../../../services/authService";
import { listarProductos } from "../../../services/productosService";

export default function PedidoDetallePage() {
    const { id } = useParams();
    const [pedido, setPedido] = useState(null);

    useEffect(() => {
        setPedido(obtenerPedido(id));
    }, [id]);

    const nombreUsuario = (usuarioId) => {
        const usuario = listarUsuarios().find((u) => u.id === usuarioId);
        return usuario ? usuario.nombre : "Usuario eliminado";
    };

    const nombreProducto = (productoId) => {
        const producto = listarProductos().find((p) => p.id === productoId);
        return producto ? producto.nombre : "Producto eliminado";
    };

    const handleCambiarEstado = (nuevoEstado) => {
        actualizarEstadoPedido(pedido.id, nuevoEstado);
        setPedido(obtenerPedido(pedido.id));
    };

    if (!pedido) {
        return (
            <div className="p-6 max-w-3xl mx-auto bg-surface min-h-screen">
                <p className="text-brand-600">Pedido no encontrado.</p>

            </div>
        );
    }
    return (
        <div className="p-6 max-w-3xl mx-auto bg-surface min-h-screen">

            <h1 className="font-heading text-2xl font-semibold text-brand-800 mb-6">
                Detalle de pedido
            </h1>
            <a href="/listado-pedido" className="inline-block mb-4 text-sm font-medium text-brand-600 hover:text-brand-800">
                ← Volver al listado
            </a>

            <div className="bg-surface-card rounded-lg border border-brand-100 p-5 mb-6 space-y-1">
                <p className="text-sm text-brand-900"><span className="font-medium">Cliente:</span> {nombreUsuario(pedido.usuarioId)}</p>
                <p className="text-sm text-brand-900"><span className="font-medium">Fecha:</span> {pedido.fecha}</p>
                <p className="text-sm text-brand-900"><span className="font-medium">Dirección de envío:</span> {pedido.direccionEnvio}</p>
                <p className="text-sm text-brand-900"><span className="font-medium">Método de pago:</span> {pedido.metodoPago}</p>
                <p className="text-sm text-brand-900"><span className="font-medium">Total:</span> S/ {pedido.total.toFixed(2)}</p>
            </div>

            <div className="pt-2">
                <label className="text-sm font-medium text-brand-900 mr-2">Estado:</label>
                <select
                    value={pedido.estado}
                    onChange={(e) => handleCambiarEstado(e.target.value)}
                    className="text-sm border border-brand-200 rounded px-2 py-1 bg-surface-card text-brand-900"
                >
                    <option value="pendiente">Pendiente</option>
                    <option value="enviado">Enviado</option>
                    <option value="entregado">Entregado</option>
                    <option value="cancelado">Cancelado</option>
                </select>
            </div>

            <div className="overflow-x-auto rounded-lg border border-brand-100 bg-surface-card">
                <table className="min-w-full divide-y divide-brand-100">
                    <thead className="bg-brand-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-brand-600 uppercase tracking-wide">Producto</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-brand-600 uppercase tracking-wide">Cantidad</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-brand-600 uppercase tracking-wide">Precio unitario</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-brand-600 uppercase tracking-wide">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-50 bg-surface-card">
                        {pedido.items.map((item, idx) => (
                            <tr key={idx}>
                                <td className="px-4 py-3 text-sm text-brand-900">{nombreProducto(item.productoId)}</td>
                                <td className="px-4 py-3 text-sm text-brand-600">{item.cantidad}</td>
                                <td className="px-4 py-3 text-sm text-brand-600">S/ {item.precioUnitario.toFixed(2)}</td>
                                <td className="px-4 py-3 text-sm text-brand-900">S/ {(item.precioUnitario * item.cantidad).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}