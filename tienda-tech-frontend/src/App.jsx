import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";
import RegistroPage from "./pages/auth/RegistroPage";
import RecuperarPasswordPage from "./pages/auth/RecuperarPasswordPage";
import RestablecerPasswordPage from "./pages/auth/RestablecerPasswordPage";

// Rutas de cliente/admin protegidas (Carrito, Checkout, Perfil, Admin...)
// se agregan en las siguientes ramas, envueltas en <ProtectedRoute>.
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegistroPage />} />
      <Route path="/recuperar-password" element={<RecuperarPasswordPage />} />
      <Route path="/reset-password" element={<RestablecerPasswordPage />} />
    </Routes>
  );
}