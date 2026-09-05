import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import {
  obtenerCarrito,
  cambiarCantidad,
  quitarDelCarrito,
  vaciarCarrito,
} from "../../services/carritoService";
import { obtenerProducto } from "../../services/productosService";

export default function CarritoPage() {
  const [carrito, setCarrito] = useState(obtenerCarrito());
  const navigate = useNavigate();

  const items = carrito
    .map((item) => ({ ...item, producto: obtenerProducto(item.id) }))
    .filter((item) => item.producto !== null);

  const subtotal = items.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);

  const handleCantidad = (productoId, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    setCarrito(cambiarCantidad(productoId, nuevaCantidad));
  };
  
  const handleQuitar = (productoId) => {
    setCarrito(quitarDelCarrito(productoId));
  };


}