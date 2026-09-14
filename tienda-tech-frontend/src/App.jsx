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
import PerfilPage from "./pages/perfil/PerfilPage";
import EditarPerfilPage from "./pages/perfil/EditarPerfilPage";
import CambiarPasswordPage from "./pages/perfil/CambiarPasswordPage";
import HistorialPedidosPage from "./pages/perfil/HistorialPedidosPage";
import PedidoDetalleClientePage from "./pages/perfil/PedidoDetalleClientePage";
import CarritoPage from "./pages/carrito/CarritoPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import ConfirmacionPedidoPage from "./pages/checkout/ConfirmacionPedidoPage";
import ProductoDetallePage from "./pages/productos/ProductoDetallePage";
import PedidoDetallePage from "./pages/admin/pedidos/PedidoDetallePage";
import DashboardPage from "./pages/admin/DashboardPage";
import CategoriasPage from "./pages/admin/categorias/CategoriasPage";
import ProductosPage from "./pages/admin/productos/ProductosPage";
import ProductoFormPage from "./pages/admin/productos/ProductoFormPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogoPage />} />
        <Route path="/producto/:id" element={<ProductoDetallePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/recuperar-password" element={<RecuperarPasswordPage />} />
        <Route path="/reset-password" element={<RestablecerPasswordPage />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute rolRequerido="admin">
              <AdminHomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listado-usuario"
          element={
            <ProtectedRoute rolRequerido="admin">
              <UsuariosPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listado-pedido"
          element={
            <ProtectedRoute rolRequerido="admin">
              <PedidosPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/detalle-pedido/:id"
          element={
            <ProtectedRoute rolRequerido="admin">
              <PedidoDetallePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute rolRequerido="admin">
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categorias"
          element={
            <ProtectedRoute rolRequerido="admin">
              <CategoriasPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/productos"
          element={
            <ProtectedRoute rolRequerido="admin">
              <ProductosPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/productos/nuevo"
          element={
            <ProtectedRoute rolRequerido="admin">
              <ProductoFormPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/productos/editar/:id"
          element={
            <ProtectedRoute rolRequerido="admin">
              <ProductoFormPage />
            </ProtectedRoute>
          }
        />

        {/* Perfil */}
        <Route path="/perfil" element={<ProtectedRoute><PerfilPage /></ProtectedRoute>} />
        <Route path="/editar-perfil" element={<ProtectedRoute><EditarPerfilPage /></ProtectedRoute>} />
        <Route path="/cambiar-password" element={<ProtectedRoute><CambiarPasswordPage /></ProtectedRoute>} />
        <Route path="/historial-pedidos" element={<ProtectedRoute><HistorialPedidosPage /></ProtectedRoute>} />
        <Route path="/pedido-detalle/:id" element={<ProtectedRoute><PedidoDetalleClientePage /></ProtectedRoute>} />

        {/* Carrito / Checkout */}
        <Route path="/carrito" element={<CarritoPage />} />
        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
        <Route path="/pedido/confirmacion" element={<ProtectedRoute><ConfirmacionPedidoPage /></ProtectedRoute>} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}