import { useState, useEffect } from "react";
import { listarUsuarios } from "../../services/authService";

export default function UsuariosPage() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        setUsuarios(listarUsuarios());
    }, []);
    return (
        <div>
            <h1>Administración de usuarios</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((u) => (
                        <tr key={u.id}>
                            <td>{u.nombre}</td>
                            <td>{u.correo}</td>
                            <td>{u.rol}</td>
                            <td>{u.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}