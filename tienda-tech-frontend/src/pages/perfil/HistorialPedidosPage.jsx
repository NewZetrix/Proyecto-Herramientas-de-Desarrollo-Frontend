import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usuarioActual } from "../../services/authService";
import Button from "../../components/ui/Button";
import Sidebar from "../../components/layout/Sidebar";
import { listarPedidosDeUsuario } from "../../services/pedidosService";

export default function HistorialPedidosPage() {
  const [cargando, setCargando] = useState(true);
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarios=usuarioActual();
    const pedidosUsuario = listarPedidosDeUsuario(usuarios.id) || [];
    setPedidos(pedidosUsuario);
    setCargando(false);
  }, []);

  if (!pedidos || cargando) {
    return (
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 lg:pt-8 sm:px-6">
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

  const misPedidos = pedidos

  return (
    <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 lg:pt-8 sm:px-6">
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
                    <div className="text-right">
                      <p className="text-slate-500 text-sm">Fecha: {new Date(
                        pedido.fecha
                      ).toLocaleDateString()}</p>
                      <Button
                        variant="secondary"
                        className="mt-2"
                        onClick={() => navigate(`/pedido-detalle/${pedido.id}`)}
                      >
                        Ver detalle
                      </Button>
                    </div>
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