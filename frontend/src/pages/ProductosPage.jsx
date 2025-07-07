import React, { useEffect, useState } from 'react';
import {
  getProductos,
  deleteProducto,
  createProducto,
  updateProducto
} from '../services/productoService';
import ProductoCard from '../components/ui/ProductoCard';

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoActual, setProductoActual] = useState({
    nombre: '',
    descripcion: '',
    stock: 0,
    categoriaId: 1,
  });

  const cargarProductos = async () => {
    const data = await getProductos();
    setProductos(data);
    setLoading(false);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleEliminar = async (id) => {
    await deleteProducto(id);
    cargarProductos();
  };

  const handleEditar = (producto) => {
    setProductoActual(producto);
    setModoEdicion(true);
    setFormVisible(true);
  };

  const handleAgregar = () => {
    setProductoActual({
      nombre: '',
      descripcion: '',
      stock: 0,
      categoriaId: 1
    });
    setModoEdicion(false);
    setFormVisible(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (modoEdicion) {
        await updateProducto(productoActual.id, productoActual);
      } else {
        await createProducto(productoActual);
      }

      setFormVisible(false);
      setProductoActual({ nombre: '', descripcion: '', stock: 0, categoriaId: 1 });
      cargarProductos();
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
  };

  return (
    <div>
      <h1>Productos</h1>

      <button onClick={handleAgregar}>
        {formVisible ? 'Cancelar' : 'Nuevo producto'}
      </button>

      {formVisible && (
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
          <input
            type="text"
            placeholder="Nombre"
            value={productoActual.nombre}
            onChange={(e) => setProductoActual({ ...productoActual, nombre: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Descripción"
            value={productoActual.descripcion}
            onChange={(e) => setProductoActual({ ...productoActual, descripcion: e.target.value })}
          />
          <input
            type="number"
            placeholder="Stock"
            value={productoActual.stock}
            onChange={(e) => setProductoActual({ ...productoActual, stock: parseInt(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Categoría ID"
            value={productoActual.categoriaId}
            onChange={(e) => setProductoActual({ ...productoActual, categoriaId: parseInt(e.target.value) })}
          />
          <button type="submit">{modoEdicion ? 'Actualizar' : 'Agregar'}</button>
        </form>
      )}

      {loading ? (
        <p>Cargando productos...</p>
      ) : productos.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        productos.map(producto => (
          <ProductoCard
            key={producto.id}
            producto={producto}
            onEditar={handleEditar}
            onEliminar={handleEliminar}
          />
        ))
      )}
    </div>
  );
};

export default ProductosPage;