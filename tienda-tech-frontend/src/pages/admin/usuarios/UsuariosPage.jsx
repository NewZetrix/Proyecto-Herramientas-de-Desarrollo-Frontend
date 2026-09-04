import { useState, useEffect } from "react";
import { listarUsuarios, cambiarRolOEstado, eliminarUsuario } from "../../../services/authService";


export default function UsuariosPage() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        setUsuarios(listarUsuarios());
    }, []);

    const handleToggleEstado = (usuario) => {
        const nuevoEstado = usuario.estado === "activo" ? "inactivo" : "activo";
        cambiarRolOEstado(usuario.id, { estado: nuevoEstado });
        setUsuarios(listarUsuarios());
    };

    const handleToggleRol = (usuario) => {
        const nuevoRol = usuario.rol === "admin" ? "cliente" : "admin";
        cambiarRolOEstado(usuario.id, { rol: nuevoRol });
        setUsuarios(listarUsuarios());
    };
    
    const handleEliminar = (usuario) => {
        const confirmar = window.confirm(
            `¿Seguro que quieres eliminar a ${usuario.nombre}? Esta acción no se puede deshacer.`
        );
        if (!confirmar) return;

        eliminarUsuario(usuario.id);
        setUsuarios(listarUsuarios());
    };
    return (
        <div className="p-6 max-w-5xl mx-auto bg-surface min-h-screen">
            <h1 className="font-heading text-2xl font-semibold text-brand-800 mb-6">Administración de usuarios</h1>
            <div className="overflow-x-auto rounded-lg border border-brand-100 bg-surface-card">
                <table className="min-w-full divide-y divide-brand-100 font-body">
                    <thead className="bg-brand-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-brand-600 uppercase tracking-wide">Nombre</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-brand-600 uppercase tracking-wide">Correo</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-brand-600 uppercase tracking-wide">Rol</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-brand-600 uppercase tracking-wide">Estado</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-brand-600 uppercase tracking-wide">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-50 bg-surface-card">
                        {usuarios.map((u) => (
                            <tr key={u.id} className="hover:bg-brand-50">
                                <td className="px-4 py-3 text-sm text-brand-900">{u.nombre}</td>
                                <td className="px-4 py-3 text-sm text-brand-600">{u.correo}</td>
                                <td className="px-4 py-3">
                                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${u.rol == "admin"
                                        ? "bg-brand-600 text-white"
                                        : "bg-brand-100 text-brand-700"
                                        }`}>
                                        {u.rol}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${u.estado == "activo"
                                        ? "bg-accent-500 text-white"
                                        : "bg-slate-200 text-slate-600"
                                        }`}>
                                        {u.estado}
                                    </span>
                                </td>
                                <td className="px-4 py-3 space-x-2">
                                    <button
                                        onClick={() => handleToggleRol(u)}
                                        className="text-xs font-medium text-brand-600 hover:text-brand-800">
                                        Cambiar rol
                                    </button>
                                    <button
                                        onClick={() => handleToggleEstado(u)}
                                        className="text-xs font-medium text-brand-600 hover:text-brand-800">
                                        {u.estado === "activo" ? "Desactivar" : "Activar"}
                                    </button>
                                    <button
                                        onClick={() => handleEliminar(u)}
                                        className="text-xs font-medium text-red-600 hover:text-red-800">
                                        Eliminar
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