import { Navigate } from "react-router-dom";
import { usuarioActual } from "../../services/authService";

// RF-51 / RF-52: restringe rutas a usuarios logueados (y opcionalmente a un rol especifico),
// y redirige al login si no corresponde.
//
// Uso:
//   <Route element={<ProtectedRoute />}>...rutas de cliente...</Route>
//   <Route element={<ProtectedRoute rolRequerido="admin" />}>...rutas de admin...</Route>
export default function ProtectedRoute({ children, rolRequerido }) {
  const usuario = usuarioActual();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (rolRequerido && usuario.rol !== rolRequerido) {
    return <Navigate to="/" replace />;
  }

  return children;
}
