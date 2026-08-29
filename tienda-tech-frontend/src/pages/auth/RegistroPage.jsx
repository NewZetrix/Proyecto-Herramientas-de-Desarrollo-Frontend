import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../../components/ui/FormField";
import Button from "../../components/ui/Button";
import { registrar } from "../../services/authService";

// RF-02: registrar una cuenta nueva (nombre, correo, contrasena, telefono).
// RF-06: valida que los campos obligatorios no esten vacios.
export default function RegistroPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    password: "",
    confirmarPassword: "",
    telefono: "",
  });
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: "" });
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!form.nombre.trim()) nuevosErrores.nombre = "Ingresa tu nombre";
    if (!form.correo.trim()) nuevosErrores.correo = "Ingresa tu correo";
    else if (!/^\S+@\S+\.\S+$/.test(form.correo)) nuevosErrores.correo = "Correo inválido";
    if (!form.password.trim()) nuevosErrores.password = "Ingresa una contraseña";
    else if (form.password.length < 6) nuevosErrores.password = "Debe tener al menos 6 caracteres";
    if (form.confirmarPassword !== form.password)
      nuevosErrores.confirmarPassword = "Las contraseñas no coinciden";
    if (!form.telefono.trim()) nuevosErrores.telefono = "Ingresa tu teléfono";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorGeneral("");
    if (!validar()) return;

    const resultado = registrar({
      nombre: form.nombre.trim(),
      correo: form.correo.trim(),
      password: form.password,
      telefono: form.telefono.trim(),
      direccion: "",
    });

    if (!resultado.ok) {
      setErrorGeneral(resultado.error);
      return;
    }
    navigate("/");
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="card p-8">
        <h1 className="text-2xl">Crea tu cuenta</h1>
        <p className="mt-1 text-sm text-slate-500">Regístrate para comprar en TechStore.</p>

        {errorGeneral && (
          <div className="mt-4 rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
            {errorGeneral}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <FormField
            label="Nombre completo"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            error={errores.nombre}
            placeholder="Ana Torres"
            required
          />
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
            label="Teléfono"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            error={errores.telefono}
            placeholder="999888777"
            required
          />
          <FormField
            label="Contraseña"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            error={errores.password}
            placeholder="Mínimo 6 caracteres"
            required
          />
          <FormField
            label="Confirmar contraseña"
            name="confirmarPassword"
            type="password"
            value={form.confirmarPassword}
            onChange={handleChange}
            error={errores.confirmarPassword}
            placeholder="••••••••"
            required
          />

          <Button type="submit" className="w-full">
            Crear cuenta
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="font-medium text-brand-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
