import { useState, useEffect } from "react";

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState([]);

  return (
    <div className="p-6 max-w-5xl mx-auto bg-surface min-h-screen">
      <h1 className="font-heading text-2xl font-semibold text-brand-800 mb-6">
        Administración de pedidos
      </h1>
    </div>
  );
}