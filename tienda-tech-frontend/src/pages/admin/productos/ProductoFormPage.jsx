import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  crearProducto,
  editarProducto,
  obtenerProducto,
} from "../../../services/productosService";
import { listarCategorias } from "../../../services/categoriasService";

export default function ProductoFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);

  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    categoriaId: "",
    precio: "",
    stock: "",
    descripcion: "",
    imagenes: "",
  });

  useEffect(() => {
    setCategorias(listarCategorias());

    if (esEdicion) {
      const producto = obtenerProducto(id);
      if (producto) {
        setForm({
          nombre: producto.nombre || "",
          categoriaId: producto.categoriaId || "",
          precio: producto.precio ?? "",
          stock: producto.stock ?? "",
          descripcion: producto.descripcion || "",
          imagenes: Array.isArray(producto.imagenes)
            ? producto.imagenes.join(", ")
            : "",
        });
      }
    }
  }, [id, esEdicion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const datos = {
      nombre: form.nombre.trim(),
      categoriaId: form.categoriaId,
      precio: Number(form.precio),
      stock: Number(form.stock),
      descripcion: form.descripcion.trim(),
      imagenes: form.imagenes
        .split(",")
        .map((img) => img.trim())
        .filter(Boolean),
      specs: {},
    };

    if (esEdicion) {
      editarProducto(id, datos);
    } else {
      crearProducto(datos);
    }

    navigate("/admin/productos");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-surface min-h-screen">
      <a
        href="/admin/productos"
        className="inline-block mb-4 text-sm font-medium text-brand-600 hover:text-brand-800"
      >
        ← Volver a productos
      </a>

      <h1 className="font-heading text-2xl font-semibold text-brand-800 mb-6">
        {esEdicion ? "Editar producto" : "Nuevo producto"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-lg border border-brand-100 bg-surface-card space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1">
            Categoría
          </label>
          <select
            name="categoriaId"
            value={form.categoriaId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1">
              Precio (S/)
            </label>
            <input
              type="number"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
              className="w-full px-3 py-2 rounded-md border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              min="0"
              required
              className="w-full px-3 py-2 rounded-md border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1">
            Descripción
          </label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 rounded-md border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1">
            Imágenes (separadas por coma)
          </label>
          <input
            type="text"
            name="imagenes"
            value={form.imagenes}
            onChange={handleChange}
            placeholder="/img/producto.jpg"
            className="w-full px-3 py-2 rounded-md border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="px-5 py-2 rounded-md bg-brand-600 text-white text-sm font-medium hover:bg-brand-700"
          >
            {esEdicion ? "Guardar cambios" : "Crear producto"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/productos")}
            className="px-5 py-2 rounded-md border border-brand-200 text-brand-600 text-sm font-medium hover:bg-brand-50"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}