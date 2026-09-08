import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { obtenerPedido } from "../../../services/pedidosService";
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

    return (
        <div className="p-6 max-w-3xl mx-auto bg-surface min-h-screen">
            <h1 className="font-heading text-2xl font-semibold text-brand-800 mb-6">
                Detalle de pedido
            </h1>
        </div>
    );
}