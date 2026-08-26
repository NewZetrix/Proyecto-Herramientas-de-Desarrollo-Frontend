import { Link } from "react-router-dom";

// Se reutiliza en Catalogo, Detalle relacionado, y mas adelante en Admin.
// (El branch de favoritos se descarto, asi que esta tarjeta no incluye ese boton.)
export default function ProductCard({ producto, categoriaNombre }) {
  return (
    <Link
      to={`/producto/${producto.id}`}
      className="card group flex flex-col overflow-hidden hover:shadow-md transition"
    >
      <div className="flex aspect-[4/3] items-center justify-center bg-brand-50 text-brand-300">
        <span className="text-xs">Imagen del producto</span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        {categoriaNombre && <span className="badge w-fit">{categoriaNombre}</span>}
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-800 group-hover:text-brand-700">
          {producto.nombre}
        </h3>
        <p className="mt-auto pt-2 text-lg font-semibold text-brand-800">
          S/ {producto.precio.toFixed(2)}
        </p>
        <p className="text-xs text-slate-400">
          {producto.stock > 0 ? `${producto.stock} disponibles` : "Sin stock"}
        </p>
      </div>
    </Link>
  );
}
