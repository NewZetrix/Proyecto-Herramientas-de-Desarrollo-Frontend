# TechStore — Tienda de tecnología (Frontend)

Proyecto académico de **Herramientas de Desarrollo Frontend**.  
Es el prototipo de una tienda online de laptops, PCs y periféricos: catálogo, carrito, checkout, perfil de cliente y panel de administración.

> **Esta entrega es solo frontend.** Los datos se guardan en el navegador (`localStorage`).  
> El backend (Spring Boot) y la integración van en las siguientes etapas.

**Demo en línea:** [https://proyecto-herramientas-de-desarrollo-pi.vercel.app](https://proyecto-herramientas-de-desarrollo-pi.vercel.app)

---

## Cuentas de prueba

Usar estas cuentas en **Iniciar sesión** para recorrer el sistema:

| Rol | Correo | Contraseña | Qué permite ver |
|-----|--------|------------|-----------------|
| **Cliente** | `ana@correo.com` | `123456` | Catálogo, carrito, checkout, perfil, historial de pedidos |
| **Administrador** | `admin@tienda.com` | `admin123` | Panel admin: usuarios, productos, categorías, pedidos y dashboard |

También existen otros clientes de ejemplo (`carlos@correo.com` / `carlos123`, etc.), pero con **Ana** y **Admin** alcanza para revisar todo.

**Recorrido sugerido**

1. Entrar como **Ana** → Catálogo → agrega un producto → Carrito → Finalizar compra.
2. Cierra sesión y entra como **Admin** → Panel admin → Productos, Pedidos y Dashboard.

---

## Qué incluye

**Cliente**
- Inicio y catálogo (búsqueda, categoría, precio, orden, paginación)
- Detalle de producto y carrito
- Registro, login, recuperar / restablecer contraseña (simulado)
- Perfil, editar datos, cambiar contraseña
- Checkout y historial de pedidos

**Administrador**
- CRUD de productos y categorías
- Gestión de usuarios (rol y estado)
- Pedidos: ver detalle y cambiar estado
- Dashboard de ventas (Recharts)

---

## Stack

- React 19 + Vite
- React Router
- Tailwind CSS
- Recharts (dashboard)

La app está en la carpeta `tienda-tech-frontend/`.
