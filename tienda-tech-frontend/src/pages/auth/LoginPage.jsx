import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../../components/ui/FormField";
import Button from "../../components/ui/Button";
import { login } from "../../services/authService";

// RF-01: iniciar sesion con correo y contrasena.
// RF-06: valida que los campos obligatorios no esten vacios.
// RF-07: muestra mensaje de error si las credenciales son incorrectas.
export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ correo: "", password: "" });
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: "" });
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!form.correo.trim()) nuevosErrores.correo = "Ingresa tu correo";
    if (!form.password.trim()) nuevosErrores.password = "Ingresa tu contraseña";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorGeneral("");
    if (!validar()) return;

    const resultado = login(form.correo.trim(), form.password);
    if (!resultado.ok) {
      setErrorGeneral(resultado.error);
      return;
    }
    navigate(resultado.usuario.rol === "admin" ? "/admin" : "/");
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="card p-8">
        <h1 className="text-2xl">Inicia sesión</h1>
        <p className="mt-1 text-sm text-slate-500">Ingresa a tu cuenta de TechStore.</p>

        {errorGeneral && (
          <div className="mt-4 rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
            {errorGeneral}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <FormField
            label="Correo electrónico"
            name="correo"
            type="email"
            value={form.correo}
            onChange={handleChange}
            error={errores.correo}
            placeholder="tucorreo@ejemplo.com"
            required
          />
          <FormField
            label="Contraseña"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            error={errores.password}
            placeholder="••••••••"
            required
          />

          <div className="flex justify-end">
            <Link to="/recuperar-password" className="text-sm text-brand-600 hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <Button type="submit" className="w-full">
            Iniciar sesión
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          ¿No tienes cuenta?{" "}
          <Link to="/registro" className="font-medium text-brand-600 hover:underline">
            Regístrate
          </Link>
        </p>

        <p className="mt-4 rounded-lg bg-brand-50 px-3 py-2 text-center text-xs text-brand-700">
          Demo: ana@correo.com / 123456 (cliente) — admin@tienda.com / admin123 (admin)
        </p>
      </div>
    </div>
  );
}
