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
            <div className="overflow-x-auto rounded-lg border border-brand-100 bg-surface-card">
                <table className="min-w-full divide-y divide-brand-100 font-body">
                    <thead className="bg-brand-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-brand-600 uppercase tracking-wide">Cliente</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-brand-600 uppercase tracking-wide">Fecha</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-brand-600 uppercase tracking-wide">Total</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-brand-600 uppercase tracking-wide">Estado</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-brand-600 uppercase tracking-wide">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-50 bg-surface-card">
                        {pedidos.map((p) => (
                            <tr key={p.id} className="hover:bg-brand-50">
                                <td className="px-4 py-3 text-sm text-brand-900">{nombreUsuario(p.usuarioId)}</td>
                                <td className="px-4 py-3 text-sm text-brand-600">{p.fecha}</td>
                                <td className="px-4 py-3 text-sm text-brand-900">S/ {p.total.toFixed(2)}</td>
                                <td className="px-4 py-3">
                                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-brand-100 text-brand-700">
                                        {p.estado}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <button className="text-xs font-medium text-brand-600 hover:text-brand-800">
                                        Ver detalle
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}