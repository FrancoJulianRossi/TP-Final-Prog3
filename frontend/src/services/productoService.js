const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export async function getProductos() {
  try {
    const response = await fetch(`${API_URL}/productos`);
    if (!response.ok) throw new Error('Error al obtener productos');
    return await response.json();
  } catch (error) {
    console.error('Error en getProductos:', error);
    return [];
  }
}

export async function createProducto(producto) {
  try {
    const response = await fetch(`${API_URL}/productos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto),
    });
    if (!response.ok) throw new Error('Error al crear producto');
    return await response.json();
  } catch (error) {
    console.error('Error en createProducto:', error);
    throw error;
  }
}

export async function deleteProducto(id) {
  try {
    const response = await fetch(`${API_URL}/productos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar producto');
  } catch (error) {
    console.error('Error en deleteProducto:', error);
    throw error;
  }
}

export async function updateProducto(id, datos) {
  try {
    const response = await fetch(`${API_URL}/productos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
    if (!response.ok) throw new Error('Error al actualizar producto');
    return await response.json();
  } catch (error) {
    console.error('Error en updateProducto:', error);
    throw error;
  }
}