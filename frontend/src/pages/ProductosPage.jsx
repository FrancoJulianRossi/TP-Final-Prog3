import React, { useEffect, useState } from 'react';
import { getProductos } from '../services/productoService';
import ProductoCard from '../components/ui/ProductoCard';

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarProductos() {
      const data = await getProductos();
      setProductos(data);
      setLoading(false);
    }

    cargarProductos();
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      <button>Nuevo producto</button>

      {loading ? (
        <p>Cargando productos...</p>
      ) : productos.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        productos.map(producto => (
          <ProductoCard key={producto.id} producto={producto} />
        ))
      )}
    </div>
  );
};

export default ProductosPage;