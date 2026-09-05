import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usuarioActual, actualizarPerfil } from "../../services/authService";
import FormField from "../../components/ui/FormField";
import Button from "../../components/ui/Button";
import Sidebar from "../../components/layout/Sidebar";

export default function EditarPerfilPage() {
  const navigate = useNavigate();
  const usuario = usuarioActual();

  if (!usuario) {
    return null;
  }

  const [form, setForm] = useState({
    nombre: usuario.nombre,
    correo: usuario.correo,
    telefono: usuario.telefono,
    direccion: usuario.direccion,
  });
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: "" });
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!form.correo.trim()) nuevosErrores.correo = "El correo es obligatorio";
    else if (!form.correo.includes("@")) nuevosErrores.correo = "Ingresa un correo válido";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorGeneral("");
    if (!validar()) return;

    try {
      await actualizarPerfil(usuario.id, form);
      setErrorGeneral("Perfil actualizado correctamente");
      setTimeout(() => navigate("/perfil"), 2000);
    } catch (e) {
      setErrorGeneral("Error al actualizar el perfil");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="lg:flex lg:w-full">
        <Sidebar />

        <main className="lg:w-full lg:pl-8">
          <h1 className="text-2xl font-heading mb-6">Editar perfil</h1>

          {errorGeneral && (
            <div className="mt-4 rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
              {errorGeneral}
            </div>
          )}

          {errorGeneral && <p className="mt-2 text-green-600">Perfil actualizado correctamente</p>}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <FormField
              label="Nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              error={errores.nombre}
              placeholder="Nombre completo"
              required
            />
            <FormField
              label="Correo electrónico"
              name="correo"
              type="email"
              value={form.correo}
              onChange={handleChange}
              error={errores.correo}
              placeholder="tu@correo.com"
              required
            />
            <FormField
              label="Teléfono"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              error={errores.telefono}
              placeholder="999-888-777"
            />
            <FormField
              label="Dirección"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              error={errores.direccion}
              placeholder="Dirección completa"
            />

            <div className="mt-6 flex justify-end">
              <Button type="submit" className="btn-primary">
                Guardar cambios
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