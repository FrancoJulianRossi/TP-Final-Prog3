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