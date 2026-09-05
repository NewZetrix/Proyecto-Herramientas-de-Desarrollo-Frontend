import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { usuarioActual, cerrarSesion } from "../../services/authService";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const usuario = usuarioActual();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => setShowDropdown(!showDropdown);

  const handleLogout = () => {
    cerrarSesion();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
            TS
          </span>
          <span className="font-heading text-lg font-semibold text-brand-900">TechStore</span>
        </Link>

        <div className="hidden items-center gap-6 sm:flex">
          <Link to="/catalogo" className="text-sm font-medium text-slate-600 hover:text-brand-700">
            Catálogo
          </Link>
          {usuario?.rol === "admin" && (
            <Link to="/admin" className="text-sm font-medium text-slate-600 hover:text-brand-700">
              Panel admin
            </Link>
          )}
          {usuario && (
            <Link to="/perfil" className="text-sm font-medium text-slate-600 hover:text-brand-700">
              Perfil
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          {usuario ? (
            <>
              <span className="hidden text-sm text-slate-600 sm:inline">
                Hola, {usuario.nombre.split(" ")[0]}
              </span>
              <div className="relative">
                <button
                  onClick={handleDropdownToggle}
                  className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-brand-700 rounded-lg px-2 py-1.5 bg-white border border-slate-200"
                >
                  Mi cuenta
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {showDropdown && (
                  <div
                    className="absolute right-0 mt-2 w-48 rounded-lg bg-white border border-slate-200 shadow-lg py-2 min-w max-w-xs z-20"
                  >
                    <Link to="/perfil" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                      Perfil
                    </Link>
                    <Link to="/editar-perfil" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                      Editar perfil
                    </Link>
                    <Link to="/cambiar-password" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                      Cambiar contraseña
                    </Link>
                    <Link to="/historial-pedidos" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                      Historial de pedidos
                    </Link>
                    <hr className="my-1 border-t border-slate-200" />
                    <button onClick={handleLogout} className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
              <span className="hidden text-sm text-slate-600 sm:inline">
                Hola, {usuario.nombre.split(" ")[0]}
              </span>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost">
                Iniciar sesión
              </Link>
              <Link to="/registro" className="btn-primary">
                Crear cuenta
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}