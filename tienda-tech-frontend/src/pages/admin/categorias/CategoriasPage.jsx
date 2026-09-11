import { useState, useEffect } from "react";
import {
  listarCategorias,
  crearCategoria,
  editarCategoria,
  eliminarCategoria,
} from "../../../services/categoriasService";

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    setCategorias(listarCategorias());
  }, []);

  const limpiarFormulario = () => {
    setNombre("");
    setEditandoId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    if (editandoId) {
      editarCategoria(editandoId, { nombre: nombre.trim() });
    } else {
      crearCategoria({ nombre: nombre.trim() });
    }

    setCategorias(listarCategorias());
    limpiarFormulario();
  };

  const handleEditar = (categoria) => {
    setNombre(categoria.nombre);
    setEditandoId(categoria.id);
  };

  const handleEliminar = (categoria) => {
    const confirmar = window.confirm(
      `¿Seguro que quieres eliminar la categoría "${categoria.nombre}"?`
    );
    if (!confirmar) return;

    eliminarCategoria(categoria.id);
    setCategorias(listarCategorias());
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-surface min-h-screen">
      <a
        href="/admin"
        className="inline-block mb-4 text-sm font-medium text-brand-600 hover:text-brand-800"
      >
        ← Volver al panel
      </a>

      <h1 className="font-heading text-2xl font-semibold text-brand-800 mb-6">
        Administración de Categorías
      </h1>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 p-5 rounded-lg border border-brand-100 bg-surface-card"
      >
        <h2 className="font-heading text-lg text-brand-700 mb-4">
          {editandoId ? "Editar categoría" : "Nueva categoría"}
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre de la categoría"
            className="flex-1 px-3 py-2 rounded-md border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-brand-600 text-white text-sm font-medium hover:bg-brand-700"
          >
            {editandoId ? "Guardar cambios" : "Crear categoría"}
          </button>
          {editandoId && (
            <button
              type="button"
              onClick={limpiarFormulario}
              className="px-4 py-2 rounded-md border border-brand-200 text-brand-600 text-sm font-medium hover:bg-brand-50"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Tabla */}
      <div className="overflow-x-auto rounded-lg border border-brand-100 bg-surface-card">
        <table className="min-w-full divide-y divide-brand-100 font-body">
          <thead className="bg-brand-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-brand-600 uppercase tracking-wide">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-brand-600 uppercase tracking-wide">
                Nombre
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-brand-600 uppercase tracking-wide">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-50 bg-surface-card">
            {categorias.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="px-4 py-6 text-center text-sm text-brand-500"
                >
                  No hay categorías registradas
                </td>
              </tr>
            ) : (
              categorias.map((c) => (
                <tr key={c.id} className="hover:bg-brand-50">
                  <td className="px-4 py-3 text-sm text-brand-600">{c.id}</td>
                  <td className="px-4 py-3 text-sm text-brand-900 font-medium">
                    {c.nombre}
                  </td>
                  <td className="px-4 py-3 space-x-3">
                    <button
                      onClick={() => handleEditar(c)}
                      className="text-xs font-medium text-brand-600 hover:text-brand-800"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(c)}
                      className="text-xs font-medium text-red-600 hover:text-red-800"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}