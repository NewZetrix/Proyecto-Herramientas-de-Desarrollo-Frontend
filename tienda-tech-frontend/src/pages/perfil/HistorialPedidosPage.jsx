import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listarUsuarios } from "../../services/authService";
import Button from "../../components/ui/Button";
import Sidebar from "../../components/layout/Sidebar";

export default function HistorialPedidosPage() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const usuarios = listarUsuarios();
    const idSesion = JSON.parse(localStorage.getItem("sesion") || "null");
    const user = usuarioActual || usuarios.find((u) => u.id === idSesion);
    setUsuarioActual(user);
    setUsuarios(usuarios);
    setCargando(false);
  }, []);

  if (!usuarioActual || cargando) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="lg:flex lg:w-full">
          <Sidebar />
          <main className="lg:w-full lg:pl-8">
            <h1 className="text-2xl font-heading mb-4">Historial de pedidos</h1>
            <p className="text-slate-500">Cargando pedidos...</p>
          </main>
        </div>
      </div>
    );
  }

  const misPedidos = usuarioActual?.pedidos || [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="lg:flex lg:w-full">
        <Sidebar />

        <main className="lg:w-full lg:pl-8">
          <h1 className="text-2xl font-heading mb-6">Historial de pedidos</h1>

          {!misPedidos.length ? (
            <div className="card p-8">
              <p className="text-slate-600">No tienes pedidos registrados.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {misPedidos.map((pedido) => (
                <div key={pedido.id} className="card p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-heading text-sm text-slate-500">Número de pedido</p>
                      <p className="text-2xl font-bold text-brand-600">{pedido.id}</p>
                    </div>
                    <p className="text-slate-500 text-sm">Fecha: {new Date(
                      pedido.fecha
                    ).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6">
            <Link to="/perfil" className="btn-ghost">
              Volver al perfil
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}