import insforge from "./insforgeClient";

/** Mapea fila de DB (snake_case) → forma del frontend (camelCase) */
const mapProducto = (row) => ({
  id: row.id,
  nombre: row.nombre,
  categoriaId: row.categoria_id,
  precio: Number(row.precio),
  stock: row.stock,
  imagenes: row.imagenes ?? [],
  descripcion: row.descripcion ?? "",
  specs: row.specs ?? {},
});

export const listarProductos = async () => {
  const { data, error } = await insforge.database
    .from("products")
    .select()
    .order("nombre", { ascending: true });

  if (error) {
    console.error("Error listando productos:", error);
    return [];
  }
  return (data ?? []).map(mapProducto);
};

export const obtenerProducto = async (id) => {
  const { data, error } = await insforge.database
    .from("products")
    .select()
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error obteniendo producto:", error);
    return null;
  }
  return data ? mapProducto(data) : null;
};

export const buscarProductos = async ({ texto, categoriaId, precioMax } = {}) => {
  let query = insforge.database.from("products").select();

  if (categoriaId) {
    query = query.eq("categoria_id", categoriaId);
  }
  if (precioMax != null && precioMax !== "") {
    query = query.lte("precio", Number(precioMax));
  }
  if (texto?.trim()) {
    query = query.ilike("nombre", `%${texto.trim()}%`);
  }

  const { data, error } = await query.order("nombre", { ascending: true });

  if (error) {
    console.error("Error buscando productos:", error);
    return [];
  }
  return (data ?? []).map(mapProducto);
};

export const crearProducto = async (producto) => {
  const { data, error } = await insforge.database
    .from("products")
    .insert({
      id: producto.id,
      nombre: producto.nombre,
      categoria_id: producto.categoriaId,
      precio: producto.precio,
      stock: producto.stock ?? 0,
      imagenes: producto.imagenes ?? [],
      descripcion: producto.descripcion ?? "",
      specs: producto.specs ?? {},
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return mapProducto(data);
};

export const editarProducto = async (id, cambios) => {
  const payload = {};
  if (cambios.nombre !== undefined) payload.nombre = cambios.nombre;
  if (cambios.categoriaId !== undefined) payload.categoria_id = cambios.categoriaId;
  if (cambios.precio !== undefined) payload.precio = cambios.precio;
  if (cambios.stock !== undefined) payload.stock = cambios.stock;
  if (cambios.imagenes !== undefined) payload.imagenes = cambios.imagenes;
  if (cambios.descripcion !== undefined) payload.descripcion = cambios.descripcion;
  if (cambios.specs !== undefined) payload.specs = cambios.specs;

  const { data, error } = await insforge.database
    .from("products")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return mapProducto(data);
};

export const eliminarProducto = async (id) => {
  const { error } = await insforge.database
    .from("products")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
};