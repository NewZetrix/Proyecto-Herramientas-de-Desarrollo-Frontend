export default function AdminHomePage() {
  return (
    <div className="p-6 max-w-5xl mx-auto bg-surface min-h-screen">
      <h1 className="font-heading text-2xl font-semibold text-brand-800 mb-6">
        Panel de administración
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a href="/listado-usuario" className="block p-5 rounded-lg border border-brand-100 bg-surface-card hover:border-brand-400 transition">
          <h2 className="font-heading text-lg text-brand-700 mb-1">Usuarios</h2>
          <p className="text-sm text-brand-500">Gestionar roles, estados y cuentas.</p>
        </a>
        <a href="/listado-pedido" className="block p-5 rounded-lg border border-brand-100 bg-surface-card hover:border-brand-400 transition">
          <h2 className="font-heading text-lg text-brand-700 mb-1">Pedidos</h2>
          <p className="text-sm text-brand-500">Ver y actualizar estado de pedidos.</p>
        </a>
      </div>
    </div>
  );
}