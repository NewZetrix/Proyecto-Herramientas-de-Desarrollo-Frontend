import { useState } from "react";

export default function Sidebar() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      {/* Botón filtros - móvil */}
      <button
        onClick={() => setShowFilters(true)}
        className="mb-4 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium md:hidden">
        ☰ Filtros
      </button>

      {/* Overlay móvil */}
      {showFilters && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setShowFilters(false)}/>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 transform overflow-y-auto
          border-r border-gray-200 bg-white p-6
          transition-transform duration-300
          md:static md:z-auto md:w-64 md:translate-x-0
          md:rounded-xl md:border
          ${showFilters ? "translate-x-0" : "-translate-x-full"}
        `}>
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">
            Filtros
          </h2>
          <button
            onClick={() => setShowFilters(false)}
            className="text-gray-500 hover:text-gray-900 md:hidden">
            ✕
          </button>
        </div>
        {/* Categorías */}
        <section className="border-b border-gray-200 pb-6">
          <h3 className="mb-4 text-sm font-semibold text-gray-900">
            Categoría
          </h3>
          <div className="space-y-3">
            {[
              "Procesadores",
              "Tarjetas gráficas",
              "Memoria RAM",
              "Almacenamiento",
              "Placas madre",
              "Fuentes de poder",
            ].map((category) => (
              <label
                key={category}
                className="flex cursor-pointer items-center gap-3 text-sm text-gray-600"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                {category}
              </label>
            ))}
          </div>
        </section>
        {/* Precio */}
        <section className="border-b border-gray-200 py-6">
          <h3 className="mb-4 text-sm font-semibold text-gray-900">
            Precio
          </h3>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="Mín."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"/>
            <span className="text-gray-400">-</span>
            <input
              type="number"
              placeholder="Máx."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>
        </section>
        {/* Marca */}
        <section className="border-b border-gray-200 py-6">
          <h3 className="mb-4 text-sm font-semibold text-gray-900">
            Marca
          </h3>
          <div className="space-y-3">
            {["AMD", "Intel", "NVIDIA", "ASUS", "MSI"].map((brand) => (
              <label
                key={brand}
                className="flex cursor-pointer items-center gap-3 text-sm text-gray-600"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
                {brand}
              </label>
            ))}
          </div>
        </section>
        {/* Disponibilidad */}
        <section className="border-b border-gray-200 py-6">
          <h3 className="mb-4 text-sm font-semibold text-gray-900">
            Disponibilidad
          </h3>
          <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
            Solo productos disponibles
          </label>
        </section>
        {/* Limpiar */}
        <button
          className="mt-6 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
          Limpiar filtros
        </button>
      </aside>
    </>
  );
}