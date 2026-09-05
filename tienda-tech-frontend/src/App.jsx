import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import CatalogoPage from "./pages/catalogo/CatalogoPage";
import LoginPage from "./pages/auth/LoginPage";
import RegistroPage from "./pages/auth/RegistroPage";
import RecuperarPasswordPage from "./pages/auth/RecuperarPasswordPage";
import RestablecerPasswordPage from "./pages/auth/RestablecerPasswordPage";
import CarritoPage from "./pages/carrito/CarritoPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import ConfirmacionPedidoPage from "./pages/checkout/ConfirmacionPedidoPage";


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


        {/* ---- nuevas rutas de esta rama: feature/carrito-checkout ---- */}
        <Route path="/carrito" element={<CarritoPage />} />
        <Route path="/checkout" element={ <ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
        <Route path="/pedido/confirmacion" element={ <ProtectedRoute><ConfirmacionPedidoPage /></ProtectedRoute>} />


        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}