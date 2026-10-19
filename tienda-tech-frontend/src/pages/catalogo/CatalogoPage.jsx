import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { buscarProductos } from "../../services/productosService";
import { listarCategorias } from "../../services/categoriasService";
import ProductCard from "../../components/productos/ProductCard";
import ProductSort from "../../components/productos/ProductSort";
import ProductPagination from "../../components/productos/ProductPagination";

export default function CatalogoPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [texto, setTexto] = useState("");
  const categoriaId = searchParams.get("categoria") ?? "";
  const [precioMax, setPrecioMax] = useState("");
  const [orden, setOrden] = useState("relevancia");
  const [paginaActual, setPaginaActual] = useState(1);

  const productosPorPagina = 6;

  // Cargar categorías una vez
  useEffect(() => {
    listarCategorias()
      .then((data) => setCategorias(data ?? []))
      .catch(() => setCategorias([]));
  }, []);

  // Buscar productos cuando cambian filtros u orden
  useEffect(() => {
    let cancelado = false;
    setLoading(true);
    setError("");

    buscarProductos({
      texto: texto.trim() || undefined,
      categoriaId: categoriaId || undefined,
      precioMax: precioMax ? Number(precioMax) : undefined,
    })
      .then((resultado) => {
        if (cancelado) return;

        let lista = resultado ?? [];

        switch (orden) {
          case "precioAsc":
            lista = [...lista].sort((a, b) => a.precio - b.precio);
            break;
          case "precioDesc":
            lista = [...lista].sort((a, b) => b.precio - a.precio);
            break;
          case "nombreAsc":
            lista = [...lista].sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
          case "nombreDesc":
            lista = [...lista].sort((a, b) => b.nombre.localeCompare(a.nombre));
            break;
          default:
            break;
        }

        setProductos(lista);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelado) return;
        console.error(err);
        setError("No se pudieron cargar los productos");
        setProductos([]);
        setLoading(false);
      });

    return () => {
      cancelado = true;
    };
  }, [texto, categoriaId, precioMax, orden]);

  // Reset página al cambiar filtros
  useEffect(() => {
    setPaginaActual(1);
  }, [texto, categoriaId, precioMax, orden]);

  const totalPaginas = Math.max(1, Math.ceil(productos.length / productosPorPagina));
  const indiceInicio = (paginaActual - 1) * productosPorPagina;
  const productosPagina = productos.slice(indiceInicio, indiceInicio + productosPorPagina);

  const categoriaNombre = (id) => categorias.find((c) => c.id === id)?.nombre;

  const handleCategoria = (id) => {
    const next = new URLSearchParams(searchParams);
    if (id) next.set("categoria", id);
    else next.delete("categoria");
    setSearchParams(next);
  };

  const limpiarFiltros = () => {
    setTexto("");
    setPrecioMax("");
    setSearchParams({});
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl">Catálogo de productos</h1>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="space-y-6">
          <div>
            <label className="field-label" htmlFor="buscador">
              Buscar
            </label>
            <input
              id="buscador"
              type="text"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Nombre del producto..."
              className="field-input"
            />
          </div>

          <div>
            <p className="field-label">Categoría</p>
            <div className="space-y-1.5">
              <button
                onClick={() => handleCategoria("")}
                className={`block w-full rounded-lg px-2.5 py-1.5 text-left text-sm ${
                  !categoriaId
                    ? "bg-brand-50 font-medium text-brand-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                Todas
              </button>
              {categorias.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoria(cat.id)}
                  className={`block w-full rounded-lg px-2.5 py-1.5 text-left text-sm ${
                    categoriaId === cat.id
                      ? "bg-brand-50 font-medium text-brand-700"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {cat.nombre}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="field-label" htmlFor="precioMax">
              Precio máximo (S/)
            </label>
            <input
              id="precioMax"
              type="number"
              min="0"
              value={precioMax}
              onChange={(e) => setPrecioMax(e.target.value)}
              placeholder="Sin límite"
              className="field-input"
            />
          </div>

          <button onClick={limpiarFiltros} className="text-sm text-brand-600 hover:underline">
            Limpiar filtros
          </button>
        </aside>

        <div>
          <div className="mb-4 flex justify-end">
            <ProductSort orden={orden} onOrdenChange={setOrden} />
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
            </div>
          ) : error ? (
            <div className="card py-16 text-center text-red-600">{error}</div>
          ) : (
            <>
              <p className="mb-4 text-sm text-slate-500">
                {productos.length} productos encontrados
              </p>

              {productos.length === 0 ? (
                <div className="card flex flex-col items-center justify-center gap-2 py-16 text-center">
                  <p className="font-medium text-slate-700">
                    No encontramos productos con esos filtros
                  </p>
                  <button
                    onClick={limpiarFiltros}
                    className="text-sm text-brand-600 hover:underline"
                  >
                    Quitar filtros
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {productosPagina.map((producto) => (
                      <ProductCard
                        key={producto.id}
                        producto={producto}
                        categoriaNombre={categoriaNombre(producto.categoriaId)}
                      />
                    ))}
                  </div>

                  <ProductPagination
                    paginaActual={paginaActual}
                    totalPaginas={totalPaginas}
                    onPaginaChange={setPaginaActual}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}