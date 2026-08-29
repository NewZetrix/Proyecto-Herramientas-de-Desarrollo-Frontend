import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import FormField from "../../components/ui/FormField";
import Button from "../../components/ui/Button";
import { listarUsuarios, actualizarPerfil } from "../../services/authService";

// RF-04: restablecer la contrasena desde el enlace recibido.
// En la version con backend, `correo` vendria de un token verificado por el servidor;
// por ahora viaja como query param porque no hay backend todavia.
export default function RestablecerPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const correo = searchParams.get("correo") ?? "";

  const [form, setForm] = useState({ password: "", confirmarPassword: "" });
  const [errores, setErrores] = useState({});
  const [listo, setListo] = useState(false);

  const usuario = listarUsuarios().find((u) => u.correo === correo);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = {};
    if (!form.password.trim() || form.password.length < 6) {
      nuevosErrores.password = "Debe tener al menos 6 caracteres";
    }
    if (form.confirmarPassword !== form.password) {
      nuevosErrores.confirmarPassword = "Las contraseñas no coinciden";
    }
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    actualizarPerfil(usuario.id, { password: form.password });
    setListo(true);
  };

  if (!usuario) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12 text-center sm:px-6">
        <div className="card p-8">
          <h1 className="text-xl">Enlace inválido</h1>
          <p className="mt-2 text-sm text-slate-500">
            No encontramos una cuenta asociada a este enlace de restablecimiento.
          </p>
          <Link to="/recuperar-password" className="btn-primary mt-6 inline-flex">
            Solicitar uno nuevo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="card p-8">
        <h1 className="text-2xl">Restablece tu contraseña</h1>
        <p className="mt-1 text-sm text-slate-500">Cuenta: {correo}</p>

        {listo ? (
          <div className="mt-6 space-y-4">
            <div className="rounded-lg bg-green-50 px-3.5 py-3 text-sm text-green-700">
              Tu contraseña se actualizó correctamente.
            </div>
            <Button className="w-full" onClick={() => navigate("/login")}>
              Ir a iniciar sesión
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <FormField
              label="Nueva contraseña"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              error={errores.password}
              placeholder="Mínimo 6 caracteres"
              required
            />
            <FormField
              label="Confirmar nueva contraseña"
              name="confirmarPassword"
              type="password"
              value={form.confirmarPassword}
              onChange={handleChange}
              error={errores.confirmarPassword}
              placeholder="••••••••"
              required
            />
            <Button type="submit" className="w-full">
              Restablecer contraseña
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
