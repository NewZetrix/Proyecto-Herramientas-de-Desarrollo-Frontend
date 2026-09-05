import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="bg-white shadow-sm border-r border-slate-200 min-h-screen flex flex-col pt-6">
      <nav className="space-y-2 px-4 pb-8">
        <Link to="/perfil" className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-brand-700 transition-colors">
          <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="2" cy="7" r="4" />
              <path d="M2 7v6a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V7" />
              <path d="M2 1l20 0" />
            </svg>
          </span>
          Perfil
        </Link>

        <Link to="/editar-perfil" className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-brand-700 transition-colors">
          <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
          Editar perfil
        </Link>

        <Link to="/cambiar-password" className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-brand-700 transition-colors">
          <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M12 1v4l0 0M12 7v4l0 0M12 11v4l0 0M12 15v4l0 0M12 3v4l0 0M12 9v4l0 0M12 19v4l0 0" />
            </svg>
          </span>
          Cambiar contraseña
        </Link>

        <Link to="/historial-pedidos" className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-brand-700 transition-colors">
          <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M17 2L7 12h8l-1.69 7.438L21 21.75l-1.31-2.188L17 2" />
            </svg>
          </span>
          Historial de pedidos
        </Link>
      </nav>
    </aside>
  );
}