import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-900">
          MiCatálogo
        </Link>
        {/* Navegación - Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600">
            Inicio
          </Link>
          <Link
            href="/catalogo"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600">
            Catálogo
          </Link>
          <Link
            href="/categorias"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600">
            Categorías
          </Link>
          <Link
            href="/ofertas"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600">
            Ofertas
          </Link>
        </div>
        {/* Acciones */}
        <div className="hidden items-center gap-4 md:flex">
          {/* Carrito */}
          <button
            aria-label="Carrito"
            className="relative text-gray-600 transition hover:text-blue-600">
            🛒
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
              0
            </span>
          </button>
          {/* Usuario */}
          <Link
            href="/login"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700">
            Ingresar
          </Link>
        </div>
        {/* Botón móvil */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl md:hidden"
          aria-label="Abrir menú">
          ☰
        </button>
      </nav>
      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Inicio
            </Link>
            <Link href="/catalogo" className="text-gray-700 hover:text-blue-600">
              Catálogo
            </Link>
            <Link
              href="/categorias"
              className="text-gray-700 hover:text-blue-600">
              Categorías
            </Link>
            <Link href="/ofertas" className="text-gray-700 hover:text-blue-600">
              Ofertas
            </Link>
            <hr />
            <Link
              href="/login"
              className="rounded-lg bg-gray-900 px-4 py-2 text-center text-sm font-medium text-white">
              Ingresar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}