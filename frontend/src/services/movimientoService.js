const API_URL = 'http://localhost:3001/api/movimientos';

export const getMovimientos = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener movimientos');
  return res.json();
};

export const getMovimientoById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Movimiento no encontrado');
  return res.json();
};

export const createMovimiento = async (data) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear movimiento');
  return res.json();
};

export const updateMovimiento = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar movimiento');
  return res.json();
};

export const deleteMovimiento = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar movimiento');
  return res.json();
};