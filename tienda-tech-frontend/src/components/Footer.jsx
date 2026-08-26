export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-950 text-gray-300">

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">

        {/* Información */}
        <div>
          <h2 className="mb-4 text-lg font-bold text-white">
            MiCatálogo
          </h2>
          <p className="max-w-xs text-sm leading-6 text-gray-400">
            Encuentra los productos que necesitas de forma rápida,
            sencilla y segura.
          </p>
        </div>
        {/* Navegación */}
        <div>
          <h3 className="mb-4 font-semibold text-white">
            Navegación
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="/" className="hover:text-white">
                Inicio
              </a>
            </li>
            <li>
              <a href="/catalogo" className="hover:text-white">
                Catálogo
              </a>
            </li>
            <li>
              <a href="/categorias" className="hover:text-white">
                Categorías
              </a>
            </li>
            <li>
              <a href="/ofertas" className="hover:text-white">
                Ofertas
              </a>
            </li>
          </ul>
        </div>
        {/* Soporte */}
        <div>
          <h3 className="mb-4 font-semibold text-white">
            Ayuda
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="/contacto" className="hover:text-white">
                Contacto
              </a>
            </li>
            <li>
              <a href="/preguntas-frecuentes" className="hover:text-white">
                Preguntas frecuentes
              </a>
            </li>
            <li>
              <a href="/terminos" className="hover:text-white">
                Términos y condiciones
              </a>
            </li>
            <li>
              <a href="/privacidad" className="hover:text-white">
                Política de privacidad
              </a>
            </li>
          </ul>
        </div>
        {/* Contacto */}
        <div>
          <h3 className="mb-4 font-semibold text-white">
            Contacto
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>📧 contacto@micatalogo.com</li>
            <li>📞 +51 999 999 999</li>
            <li>📍 Lima, Perú</li>
          </ul>
          {/* Redes */}
          <div className="mt-5 flex gap-4">
            <a href="#" className="hover:text-white">
              Facebook
            </a>
            <a href="#" className="hover:text-white">
              Instagram
            </a>
            <a href="#" className="hover:text-white">
              TikTok
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-gray-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} MiCatálogo. Todos los derechos
            reservados.
          </p>

          <p>
            Diseñado para una experiencia de compra sencilla.
          </p>
        </div>
      </div>

    </footer>
  );
}