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
  const [preview, setPreview] = useState(""); // vista previa de la imagen
  const [form, setForm] = useState({
    nombre: "",
    categoriaId: "",
    precio: "",
    stock: "",
    descripcion: "",
    imagenes: [], // ahora guardamos un array (puede tener base64)
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
          imagenes: Array.isArray(producto.imagenes) ? producto.imagenes : [],
        });

        // Mostrar la primera imagen como preview si existe
        if (producto.imagenes && producto.imagenes.length > 0) {
          setPreview(producto.imagenes[0]);
        }
      }
    }
  }, [id, esEdicion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Cuando el usuario selecciona una foto
  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar que sea una imagen
    if (!file.type.startsWith("image/")) {
      alert("Por favor selecciona un archivo de imagen válido");
      return;
    }

    // Convertir a Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setPreview(base64);
      setForm((prev) => ({
        ...prev,
        imagenes: [base64], // guardamos la imagen en base64
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const datos = {
      nombre: form.nombre.trim(),
      categoriaId: form.categoriaId,
      precio: Number(form.precio),
      stock: Number(form.stock),
      descripcion: form.descripcion.trim(),
      imagenes: form.imagenes,
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
        className="p-6 rounded-lg border border-brand-100 bg-surface-card space-y-5"
      >
        {/* Nombre */}
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

        {/* Categoría */}
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

        {/* Precio y Stock */}
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

        {/* Descripción */}
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

        {/* ========== SUBIR FOTO ========== */}
        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1">
            Foto del producto
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImagenChange}
            className="w-full text-sm text-brand-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-medium
              file:bg-brand-600 file:text-white
              hover:file:bg-brand-700
              cursor-pointer"
          />

          {/* Vista previa de la imagen */}
          {preview && (
            <div className="mt-4">
              <p className="text-xs text-brand-500 mb-2">Vista previa:</p>
              <img
                src={preview}
                alt="Vista previa"
                className="w-40 h-40 object-cover rounded-lg border border-brand-100"
              />
            </div>
          )}
        </div>

        {/* Botones */}
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