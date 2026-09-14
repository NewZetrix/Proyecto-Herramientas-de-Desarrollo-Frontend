import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { obtenerProducto } from "../../services/productosService";
import { listarCategorias } from "../../services/categoriasService";
import { agregarAlCarrito } from "../../services/carritoService";

// Imagen por defecto
const IMAGEN_DEFAULT =
  "https://placehold.co/600x600/e2e8f0/64748b?text=Sin+imagen";

export default function ProductoDetallePage() {
  const { id } = useParams();

  const producto = obtenerProducto(id);
  const categorias = listarCategorias();

  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  if (!producto) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="card flex flex-col items-center gap-4 py-16 text-center">
          <h1 className="text-xl font-semibold text-slate-800">
            Producto no encontrado
          </h1>

          <Link
            to="/catalogo"
            className="text-sm text-brand-600 hover:underline"
          >
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  const categoriaNombre = categorias.find(
    (categoria) => categoria.id === producto.categoriaId
  )?.nombre;

  // Imagen real o por defecto
  const imagen =
    Array.isArray(producto.imagenes) && producto.imagenes.length > 0
      ? producto.imagenes[0]
      : IMAGEN_DEFAULT;

  const aumentarCantidad = () => {
    setCantidad((actual) => Math.min(actual + 1, producto.stock));
  };

  const disminuirCantidad = () => {
    setCantidad((actual) => Math.max(actual - 1, 1));
  };

  const handleAgregar = () => {
    agregarAlCarrito(producto.id, cantidad);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1500);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Link to="/catalogo" className="text-sm text-brand-600 hover:underline">
        ← Volver al catálogo
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Imagen */}
        <div className="card flex aspect-square items-center justify-center bg-brand-50 overflow-hidden">
          <img
            src={imagen}
            alt={producto.nombre}
            className="h-full w-full object-contain p-6"
            onError={(e) => {
              e.target.src = IMAGEN_DEFAULT;
            }}
          />
        </div>

        {/* Información */}
        <div className="flex flex-col">
          {categoriaNombre && (
            <span className="badge w-fit">{categoriaNombre}</span>
          )}

          <h1 className="mt-3 text-2xl font-bold text-slate-800">
            {producto.nombre}
          </h1>

          <p className="mt-4 text-2xl font-semibold text-brand-800">
            S/ {Number(producto.precio).toFixed(2)}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            {producto.stock > 0
              ? `${producto.stock} unidades disponibles`
              : "Sin stock"}
          </p>

          <p className="mt-6 leading-7 text-slate-600">
            {producto.descripcion}
          </p>

          {/* Cantidad */}
          {producto.stock > 0 && (
            <div className="mt-6">
              <p className="field-label">Cantidad</p>

              <div className="mt-2 flex items-center gap-3">
                <button
                  onClick={disminuirCantidad}
                  disabled={cantidad === 1}
                  className="btn-secondary h-10 w-10"
                >
                  -
                </button>

                <span className="min-w-8 text-center font-medium">
                  {cantidad}
                </span>

                <button
                  onClick={aumentarCantidad}
                  disabled={cantidad === producto.stock}
                  className="btn-secondary h-10 w-10"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Carrito */}
          <button
            onClick={handleAgregar}
            disabled={producto.stock === 0}
            className="btn-primary mt-6 w-full"
          >
            {agregado ? "✓ Agregado al carrito" : "Agregar al carrito"}
          </button>
        </div>
      </div>

      {/* Especificaciones */}
      {producto.specs && Object.keys(producto.specs).length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-slate-800">
            Especificaciones
          </h2>

          <div className="card mt-4 overflow-hidden">
            {Object.entries(producto.specs).map(([nombre, valor]) => (
              <div
                key={nombre}
                className="flex border-b border-slate-100 px-4 py-3 last:border-b-0"
              >
                <span className="w-1/2 font-medium capitalize text-slate-700">
                  {nombre}
                </span>
                <span className="w-1/2 text-slate-600">{valor}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}