import { useState } from "react";
import { Link } from "react-router-dom";
import { agregarAlCarrito } from "../../services/carritoService";

// Imagen por defecto (placeholder)
const IMAGEN_DEFAULT =
  "https://placehold.co/400x300/e2e8f0/64748b?text=Sin+imagen";

export default function ProductCard({ producto, categoriaNombre }) {
  const [agregado, setAgregado] = useState(false);

  const handleAgregar = () => {
    agregarAlCarrito(producto.id, 1);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1500);
  };

  // Si tiene imagen la usamos, si no usamos la por defecto
  const imagen =
    Array.isArray(producto.imagenes) && producto.imagenes.length > 0
      ? producto.imagenes[0]
      : IMAGEN_DEFAULT;

  return (
    <div className="card group flex flex-col overflow-hidden transition hover:shadow-md">
      <Link to={`/producto/${producto.id}`} className="flex flex-1 flex-col">
        <div className="flex aspect-[4/3] items-center justify-center bg-brand-50 overflow-hidden">
          <img
            src={imagen}
            alt={producto.nombre}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Si la imagen falla al cargar, ponemos la por defecto
              e.target.src = IMAGEN_DEFAULT;
            }}
          />
        </div>

        <div className="flex flex-1 flex-col gap-1.5 p-4 pb-0">
          {categoriaNombre && (
            <span className="badge w-fit">{categoriaNombre}</span>
          )}
          <h3 className="line-clamp-2 text-sm font-semibold text-slate-800 group-hover:text-brand-700">
            {producto.nombre}
          </h3>
          <p className="mt-auto pt-2 text-lg font-semibold text-brand-800">
            S/ {Number(producto.precio).toFixed(2)}
          </p>
          <p className="text-xs text-slate-400">
            {producto.stock > 0
              ? `${producto.stock} disponibles`
              : "Sin stock"}
          </p>
        </div>
      </Link>

      <div className="p-4 pt-3">
        <button
          onClick={handleAgregar}
          disabled={producto.stock === 0}
          className="btn-secondary w-full text-xs"
        >
          {agregado ? "✓ Agregado" : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
}