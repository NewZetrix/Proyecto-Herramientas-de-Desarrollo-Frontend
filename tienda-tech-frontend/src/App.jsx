import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import CatalogoPage from "./pages/catalogo/CatalogoPage";
import LoginPage from "./pages/auth/LoginPage";
import RegistroPage from "./pages/auth/RegistroPage";
import RecuperarPasswordPage from "./pages/auth/RecuperarPasswordPage";
import RestablecerPasswordPage from "./pages/auth/RestablecerPasswordPage";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import PerfilPage from "./pages/perfil/PerfilPage";
import EditarPerfilPage from "./pages/perfil/EditarPerfilPage";
import CambiarPasswordPage from "./pages/perfil/CambiarPasswordPage";
import HistorialPedidosPage from "./pages/perfil/HistorialPedidosPage";

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
          <Route path="/perfil" element={<PerfilPage />} />
          <Route path="/editar-perfil" element={<EditarPerfilPage />} />
          <Route path="/cambiar-password" element={<CambiarPasswordPage />} />
          <Route path="/historial-pedidos" element={<HistorialPedidosPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}