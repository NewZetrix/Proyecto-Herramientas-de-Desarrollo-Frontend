import insforge from "./insforgeClient";

/** Mapea fila de categoría de DB (snake_case) → forma del frontend (camelCase) */
const mapCategoria = (row) => ({
  id: row.id,
  nombre: row.nombre,
});

export const listarCategorias = async () => {
  const { data, error } = await insforge.database
    .from("categories")
    .select()
    .order("nombre", { ascending: true });

  if (error) {
    console.error("Error listando categorías:", error);
    return [];
  }
  return (data ?? []).map(mapCategoria);
};

export const crearCategoria = async (categoria) => {
  const { data, error } = await insforge.database
    .from("categories")
    .insert({
      nombre: categoria.nombre,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return mapCategoria(data);
};

export const editarCategoria = async (id, cambios) => {
  const payload = {};
  if (cambios.nombre !== undefined) payload.nombre = cambios.nombre;

  const { data, error } = await insforge.database
    .from("categories")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return mapCategoria(data);
};

export const eliminarCategoria = async (id) => {
  const { error } = await insforge.database
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
};