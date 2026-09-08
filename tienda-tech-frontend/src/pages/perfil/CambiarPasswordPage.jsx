import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { actualizarPerfil, usuarioActual } from "../../services/authService";
import FormField from "../../components/ui/FormField";
import Button from "../../components/ui/Button";
import Sidebar from "../../components/layout/Sidebar";

export default function CambiarPasswordPage() {
  const navigate = useNavigate();
  const usuario = usuarioActual();

  if (!usuario) {
    return null;
  }

  const [form, setForm] = useState({
    passwordActual: "",
    passwordNueva: "",
    passwordConfirmar: "",
  });
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: "" });
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!form.passwordActual.trim()) nuevosErrores.passwordActual = "Ingresa tu contraseña actual";
    if (!form.passwordNueva.trim()) nuevosErrores.passwordNueva = "Ingresa la nueva contraseña";
    if (form.passwordNueva.length < 6) nuevosErrores.passwordNueva = "La contraseña debe tener al menos 6 caracteres";
    if (form.passwordNueva !== form.passwordConfirmar) nuevosErrores.passwordConfirmar = "Las contraseñas no coinciden";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorGeneral("");
    if (!validar()) return;

    try {
      await actualizarPerfil(usuario.id, { password: form.passwordNueva });
      setErrorGeneral("Contraseña actualizada correctamente");
      setTimeout(() => navigate("/perfil"), 2000);
    } catch (e) {
      setErrorGeneral("Error al actualizar la contraseña");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="lg:flex lg:w-full">
        <Sidebar />

        <main className="lg:w-full lg:pl-8">
          <h1 className="text-2xl font-heading mb-6">Cambiar contraseña</h1>

          {errorGeneral && (
            <div className="mt-4 rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
              {errorGeneral}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <FormField
              label="Contraseña actual"
              name="passwordActual"
              type="password"
              value={form.passwordActual}
              onChange={handleChange}
              error={errores.passwordActual}
              placeholder="••••••••"
              required
            />
            <FormField
              label="Nueva contraseña"
              name="passwordNueva"
              type="password"
              value={form.passwordNueva}
              onChange={handleChange}
              error={errores.passwordNueva}
              placeholder="••••••••"
              required
            />
            <FormField
              label="Confirmar nueva contraseña"
              name="passwordConfirmar"
              type="password"
              value={form.passwordConfirmar}
              onChange={handleChange}
              error={errores.passwordConfirmar}
              placeholder="••••••••"
              required
            />

            <div className="mt-6 flex justify-end">
              <Button type="submit" className="btn-primary">
                Actualizar contraseña
              </Button>
              <Link to="/perfil" className="ml-4 btn-ghost">
                Cancelar
              </Link>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}