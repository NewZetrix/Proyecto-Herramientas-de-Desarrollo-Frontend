import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import FormField from "../../components/ui/FormField";
import Button from "../../components/ui/Button";
import { obtenerCarrito, vaciarCarrito } from "../../services/carritoService";
import { obtenerProducto } from "../../services/productosService";
import { crearPedido } from "../../services/pedidosService";
import { usuarioActual } from "../../services/authService";

const METODOS_PAGO = [
  "Tarjeta de crédito",
  "Tarjeta de débito",
  "Yape / Plin",
  "Pago contra entrega",
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const usuario = usuarioActual();

  const carrito = obtenerCarrito();
  const items = carrito
    .map((item) => ({ ...item, producto: obtenerProducto(item.id) }))
    .filter((item) => item.producto !== null);
  const total = items.reduce((acc, i) => acc + i.producto.precio * i.cantidad, 0);

  const [form, setForm] = useState({
    direccion: usuario?.direccion ?? "",
    metodoPago: METODOS_PAGO[0],
  });
  const [error, setError] = useState("");

  // Si no hay nada en el carrito, no tiene sentido estar en checkout.
  if (items.length === 0) {
    return <Navigate to="/carrito" replace />;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.direccion.trim()) {
      setError("Ingresa una dirección de envío");
      return;
    }

    const pedido = crearPedido({
      usuarioId: usuario.id,
      items: items.map((i) => ({
        productoId: i.producto.id,
        cantidad: i.cantidad,
        precioUnitario: i.producto.precio,
      })),
      direccionEnvio: form.direccion.trim(),
      metodoPago: form.metodoPago,
    });

    vaciarCarrito();
    navigate("/pedido/confirmacion", { state: { pedidoId: pedido.id } });
  };


}