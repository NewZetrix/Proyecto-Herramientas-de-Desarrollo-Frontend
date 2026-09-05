import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import CatalogoPage from "./pages/catalogo/CatalogoPage";
import LoginPage from "./pages/auth/LoginPage";
import RegistroPage from "./pages/auth/RegistroPage";
import RecuperarPasswordPage from "./pages/auth/RecuperarPasswordPage";
import RestablecerPasswordPage from "./pages/auth/RestablecerPasswordPage";
import UsuariosPage from "./pages/admin/usuarios/UsuariosPage";
import PedidosPage from "./pages/admin/pedidos/PedidosPage";
import AdminHomePage from "./pages/admin/AdminHomePage";
import ProtectedRoute from "./components/layout/ProtectedRoute";
// Rutas de cliente/admin protegidas (Carrito, Checkout, Perfil, Admin...)
// se agregan en las siguientes ramas, envueltas en <ProtectedRoute>.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogoPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/recuperar-password" element={<RecuperarPasswordPage />} />
        <Route path="/reset-password" element={<RestablecerPasswordPage />} />
        <Route path="/admin" element={
          <ProtectedRoute rolRequerido="admin">
            <AdminHomePage />
          </ProtectedRoute>
        } />
        <Route path="/listado-usuario" element={
          <ProtectedRoute rolRequerido="admin">
            <UsuariosPage />
          </ProtectedRoute>
        } />
        <Route path="/listado-pedido" element={
          <ProtectedRoute rolRequerido="admin">
            <PedidosPage />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}