import { useState, useEffect } from "react";
import { listarPedidos } from "../../services/pedidosService";
import { listarProductos } from "../../services/productosService";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from "recharts";

export default function DashboardPage() {
    const [pedidos, setPedidos] = useState([]);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        setPedidos(listarPedidos());
        setProductos(listarProductos());
    }, []);

    const ventasTotales = pedidos.reduce((acc, p) => acc + p.total, 0);

    const cantidadPorProducto = {};
    pedidos.forEach((pedido) => {
        pedido.items.forEach((item) => {
            cantidadPorProducto[item.productoId] =
                (cantidadPorProducto[item.productoId] || 0) + item.cantidad;
        });
    });

    const idProductoMasVendido = Object.keys(cantidadPorProducto).sort(
        (a, b) => cantidadPorProducto[b] - cantidadPorProducto[a]
    )[0];

    const productoMasVendido = productos.find((p) => p.id === idProductoMasVendido);

    const ventasPorMes = {};
    pedidos.forEach((pedido) => {
        const mes = pedido.fecha.slice(0, 7); // "2026-07-15" -> "2026-07"
        ventasPorMes[mes] = (ventasPorMes[mes] || 0) + pedido.total;
    });

    const datosGrafico = Object.keys(ventasPorMes)
        .sort()
        .map((mes) => ({ mes, total: ventasPorMes[mes] }));

    return (
        <div className="p-6 max-w-5xl mx-auto bg-surface min-h-screen">
            <a href="/admin" className="inline-block mb-4 text-sm font-medium text-brand-600 hover:text-brand-800">
                ← Volver al panel
            </a>
            <h1 className="font-heading text-2xl font-semibold text-brand-800 mb-6">
                Dashboard
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-surface-card rounded-lg border border-brand-100 p-5">
                    <p className="text-xs font-medium text-brand-500 uppercase tracking-wide mb-1">Ventas totales</p>
                    <p className="text-2xl font-heading font-semibold text-brand-800">S/ {ventasTotales.toFixed(2)}</p>
                </div>
                <div className="bg-surface-card rounded-lg border border-brand-100 p-5">
                    <p className="text-xs font-medium text-brand-500 uppercase tracking-wide mb-1">Producto más vendido</p>
                    <p className="text-lg font-heading font-semibold text-brand-800">
                        {productoMasVendido ? productoMasVendido.nombre : "Sin datos"}
                    </p>
                </div>
            </div>
            <div className="bg-surface-card rounded-lg border border-brand-100 p-5">
                <h2 className="font-heading text-lg font-semibold text-brand-800 mb-4">
                    Ventas por período
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={datosGrafico}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#D9E6FF" />
                        <XAxis dataKey="mes" tick={{ fill: "#2151B0", fontSize: 12 }} />
                        <YAxis tick={{ fill: "#2151B0", fontSize: 12 }} />
                        <Tooltip formatter={(value) => `S/ ${value.toFixed(2)}`} />
                        <Bar dataKey="total" fill="#2F68DA" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}