import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usuarioActual, actualizarPerfil } from "../../services/authService";
import FormField from "../../components/ui/FormField";
import Button from "../../components/ui/Button";
import Sidebar from "../../components/layout/Sidebar";

export default function PerfilPage() {
  const [usuario, setUsuario] = useState(usuarioActual());
  const navigate = useNavigate();
  const [editando, setEditando] = useState(false);
  const [temp, setTemp] = useState({
    nombre: usuario?.nombre || "",
    correo: usuario?.correo || "",
    telefono: usuario?.telefono || "",
    direccion: usuario?.direccion || "",
  });

  const handleChange = (e) => {
    setTemp({ ...temp, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setUsuario(temp);
    await actualizarPerfil(usuario.id, temp);
    setEditando(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="lg:flex lg:w-full">
        <Sidebar />

        <main className="lg:w-full lg:pl-8">
          <h1 className="text-2xl font-heading mb-6">Mi perfil</h1>

          <div className="card p-8 mb-8">
            <div className="space-y-4">
              <p className="text-slate-600">
                <strong>Nombre:</strong> {usuario?.nombre || "—"}
              </p>
              <p className="text-slate-600">
                <strong>Correo:</strong> {usuario?.correo || "—"}
              </p>
              <p className="text-slate-600">
                <strong>Teléfono:</strong> {usuario?.telefono || "—"}
              </p>
              <p className="text-slate-600">
                <strong>Dirección:</strong> {usuario?.direccion || "—"}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}