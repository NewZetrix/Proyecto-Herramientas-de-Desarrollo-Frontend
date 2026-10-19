import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listarProductos, eliminarProducto, buscarProductos } from "../../../services/productosService";
import { listarCategorias } from "../../../services/categoriasService";

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [texto, setTexto] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [loading, setLoading] = useState(true);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [prods, cats] = await Promise.all([listarProductos(), listarCategorias()]);
      setProductos(prods);
      setCategorias(cats);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleBuscar = async (e) => {
    e.preventDefault();
    setLoading(true);
    const resultado = await buscarProductos({
      texto: texto.trim() || undefined,
      categoriaId: categoriaId || undefined,
    });
    setProductos(resultado);
    setLoading(false);
  };

  const handleLimpiar = async () => {
    setTexto("");
    setCategoriaId("");
    setLoading(true);
    const prods = await listarProductos();
    setProductos(prods);
    setLoading(false);
  };

  const handleEliminar = async (producto) => {
    const confirmar = window.confirm(
      `¿Seguro que quieres eliminar el producto "${producto.nombre}"?`
    );
    if (!confirmar) return;

    try {
      await eliminarProducto(producto.id);
      setProductos((prev) => prev.filter((p) => p.id !== producto.id));
    } catch (err) {
      alert("Error al eliminar el producto: " + err.message);
    }
  };

  const obtenerNombreCategoria = (id) => {
    const cat = categorias.find((c) => c.id === id);
    return cat ? cat.nombre : "Sin categoría";
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-surface min-h-screen">
      <Link
        to="/admin"
        className="inline-block mb-4 text-sm font-medium text-brand-600 hover:text-brand-800"
      >
        ← Volver al panel
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="font-heading text-2xl font-semibold text-brand-800">
          Administración de Productos
        </h1>
        <Link
          to="/admin/productos/nuevo"
          className="px-4 py-2 rounded-md bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 text-center"
        >
          + Nuevo producto
        </Link>
      </div>

      {/* Filtros */}
      <form onSubmit={handleBuscar} className="mb-6 p-4 rounded-lg border border-brand-100 bg-surface-card flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Buscar por nombre..."
          className="flex-1 px-3 py-2 rounded-md border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
        />
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          className="px-3 py-2 rounded-md border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
        >
          <option value="">Todas las categorías</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-brand-600 text-white text-sm font-medium hover:bg-brand-700"
        >
          Buscar
        </button>
        <button
          type="button"
          onClick={handleLimpiar}
          className="px-4 py-2 rounded-md border border-brand-200 text-brand-600 text-sm font-medium hover:bg-brand-50"
        >
          Limpiar
        </button>
      </form>

      {/* Tabla */}
      <div className="overflow-x-auto rounded-lg border border-brand-100 bg-surface-card">
        <table className="min-w-full divide-y divide-brand-100 font-body">
          <thead className="bg-brand-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-brand-600 uppercase tracking-wide">
                Nombre
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-brand-600 uppercase tracking-wide">
                Categoría
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-brand-600 uppercase tracking-wide">
                Precio
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-brand-600 uppercase tracking-wide">
                Stock
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-brand-600 uppercase tracking-wide">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-50 bg-surface-card">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-sm text-brand-500">
                  Cargando productos...
                </td>
              </tr>
            ) : productos.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-sm text-brand-500">
                  No se encontraron productos
                </td>
              </tr>
            ) : (
              productos.map((p) => (
                <tr key={p.id} className="hover:bg-brand-50">
                  <td className="px-4 py-3 text-sm text-brand-900 font-medium">
                    {p.nombre}
                  </td>
                  <td className="px-4 py-3 text-sm text-brand-600">
                    {obtenerNombreCategoria(p.categoriaId)}
                  </td>
                  <td className="px-4 py-3 text-sm text-brand-900">
                    S/ {Number(p.precio).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm text-brand-600">{p.stock}</td>
                  <td className="px-4 py-3 space-x-3">
                    <Link
                      to={`/admin/productos/editar/${p.id}`}
                      className="text-xs font-medium text-brand-600 hover:text-brand-800"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleEliminar(p)}
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