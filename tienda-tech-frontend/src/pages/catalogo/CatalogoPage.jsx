import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { buscarProductos } from "../../services/productosService";
import { listarCategorias } from "../../services/categoriasService";
import ProductCard from "../../components/productos/ProductCard";

// RF-08: mostrar el listado de productos disponibles.
// RF-09: filtrar productos por categoria.
// RF-10: filtrar productos por rango de precio.
// RF-11: buscar productos por nombre o palabra clave.
//
// RF-12 (ordenar), RF-13 (detalle) y RF-14 (paginacion) quedan para la
// siguiente rama (feature/catalogo-detalle-favoritos ya sin la parte de favoritos).
export default function CatalogoPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categorias = listarCategorias();

  const [texto, setTexto] = useState("");
  const categoriaId = searchParams.get("categoria") ?? "";
  const [precioMax, setPrecioMax] = useState("");

  const productos = useMemo(
    () =>
      buscarProductos({
        texto: texto.trim() || undefined,
        categoriaId: categoriaId || undefined,
        precioMax: precioMax ? Number(precioMax) : undefined,
      }),
    [texto, categoriaId, precioMax]
  );

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
          <p className="mb-4 text-sm text-slate-500">{productos.length} productos encontrados</p>

          {productos.length === 0 ? (
            <div className="card flex flex-col items-center justify-center gap-2 py-16 text-center">
              <p className="font-medium text-slate-700">
                No encontramos productos con esos filtros
              </p>
              <button onClick={limpiarFiltros} className="text-sm text-brand-600 hover:underline">
                Quitar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {productos.map((producto) => (
                <ProductCard
                  key={producto.id}
                  producto={producto}
                  categoriaNombre={categoriaNombre(producto.categoriaId)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
