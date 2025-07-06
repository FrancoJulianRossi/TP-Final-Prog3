const API_URL = 'http://localhost:3001/api/categorias';

export const getCategorias = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener categorías');
  return res.json();
};

export const getCategoriaById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Categoría no encontrada');
  return res.json();
};

export const createCategoria = async (data) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear categoría');
  return res.json();
};

export const updateCategoria = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar categoría');
  return res.json();
};

export const deleteCategoria = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar categoría');
  return res.json();
};