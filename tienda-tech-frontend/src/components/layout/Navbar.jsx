import { Link, useNavigate, useLocation } from "react-router-dom";
import { usuarioActual, cerrarSesion } from "../../services/authService";
import { obtenerCarrito } from "../../services/carritoService";

// RF-48: menu de navegacion principal.
// Cambia su contenido segun si hay sesion activa y segun el rol (cliente/admin).
export default function Navbar() {
  const navigate = useNavigate();
  // useLocation fuerza el re-render del Navbar en cada cambio de ruta,
  // que es cuando puede haber cambiado la sesion (login/logout/registro).
  // localStorage no es reactivo por si solo, por eso leemos usuarioActual()
  // directo en el render en vez de guardarlo en un useState + useEffect.
  useLocation();
  const usuario = usuarioActual();
  const cantidadCarrito = obtenerCarrito().reduce((acc, item) => acc + item.cantidad, 0);

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
        </div>

        <div className="flex items-center gap-3">
          <Link to="/carrito" className="btn-ghost relative">
            Carrito
            {cantidadCarrito > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent-500 text-[10px] font-semibold text-white">
                {cantidadCarrito}
              </span>
            )}
          </Link>
          {usuario ? (
            <>
              <span className="hidden text-sm text-slate-600 sm:inline">
                Hola, {usuario.nombre.split(" ")[0]}
              </span>
              <button onClick={handleLogout} className="btn-ghost">
                Cerrar sesión
              </button>
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
