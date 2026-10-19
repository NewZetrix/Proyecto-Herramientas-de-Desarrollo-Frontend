import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  crearProducto,
  editarProducto,
  obtenerProducto,
} from "../../../services/productosService";
import { listarCategorias } from "../../../services/categoriasService";
import insforge from "../../../services/insforgeClient";

export default function ProductoFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);

  const [categorias, setCategorias] = useState([]);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    categoriaId: "",
    precio: "",
    stock: "",
    descripcion: "",
    imagenes: [],
  });

  useEffect(() => {
    listarCategorias().then(setCategorias);

    if (esEdicion) {
      obtenerProducto(id).then((producto) => {
        if (producto) {
          setForm({
            nombre: producto.nombre || "",
            categoriaId: producto.categoriaId || "",
            precio: producto.precio ?? "",
            stock: producto.stock ?? "",
            descripcion: producto.descripcion || "",
            imagenes: Array.isArray(producto.imagenes) ? producto.imagenes : [],
          });

          if (producto.imagenes && producto.imagenes.length > 0) {
            setPreview(producto.imagenes[0]);
          }
        }
      });
    }
  }, [id, esEdicion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Subir imagen al Storage de InsForge (bucket: product-images)
  const handleImagenChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Por favor selecciona un archivo de imagen válido");
      return;
    }

    try {
      setLoading(true);
      const fileName = `prod_${Date.now()}_${file.name}`;
      
      const { data, error } = await insforge.storage
        .from("product-images")
        .upload(fileName, file);

      if (error) throw error;

      // Obtener la URL pública del archivo subido
      const publicUrl = insforge.storage
        .from("product-images")
        .getPublicUrl(fileName);

      setPreview(publicUrl);
      setForm((prev) => ({
        ...prev,
        imagenes: [publicUrl],
      }));
    } catch (err) {
      console.error("Error al subir imagen:", err);
      alert("No se pudo subir la imagen al Storage");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
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

    try {
      setLoading(true);
      if (esEdicion) {
        await editarProducto(id, datos);
      } else {
        await crearProducto(datos);
      }
      navigate("/admin/productos");
    } catch (err) {
      alert("Error al guardar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-surface min-h-screen">
      <Link
        to="/admin/productos"
        className="inline-block mb-4 text-sm font-medium text-brand-600 hover:text-brand-800"
      >
        ← Volver a productos
      </Link>

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

        {/* SUBIR FOTO */}
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

          {loading && <p className="text-xs text-brand-500 mt-2">Subiendo imagen...</p>}

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
            disabled={loading}
            className="px-5 py-2 rounded-md bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 disabled:opacity-50"
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