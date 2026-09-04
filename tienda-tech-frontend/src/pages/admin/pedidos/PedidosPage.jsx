import { useState, useEffect } from "react";
import { listarPedidos } from "../../../services/pedidosService";
import { listarUsuarios } from "../../../services/authService";

export default function PedidosPage() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        setPedidos(listarPedidos());
    }, []);

    const nombreUsuario = (usuarioId) => {
        const usuario = listarUsuarios().find((u) => u.id === usuarioId);
        return usuario ? usuario.nombre : "Usuario eliminado";
    };

    return (
        <div className="p-6 max-w-5xl mx-auto bg-surface min-h-screen">
            <h1 className="font-heading text-2xl font-semibold text-brand-800 mb-6">
                Administración de pedidos
            </h1>
        </div>
    );
}