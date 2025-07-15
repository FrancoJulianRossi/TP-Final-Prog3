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

  const toggleForm = () => {
    if (formVisible) {
      setFormVisible(false);
      setModoEdicion(false);
      setProductoActual({ nombre: '', descripcion: '', stock: 0, categoriaId: 1 });
    } else {
      handleAgregar();
    }
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
    <div style={{ width: '100%', padding: '1rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Productos
      </h1>

      <button
        onClick={toggleForm}
        style={{
          backgroundColor: '#4caf50',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '1rem',
          fontWeight: '600',
          transition: 'background-color 0.3s',
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#45a049')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#4caf50')}
      >
        {formVisible ? 'Cancelar' : 'Nuevo producto'}
      </button>

      {formVisible && (
        <form
          onSubmit={handleSubmit}
          style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}
        >
          <input
            type="text"
            placeholder="Nombre"
            value={productoActual.nombre}
            onChange={(e) => setProductoActual({ ...productoActual, nombre: e.target.value })}
            required
            style={{
              flexGrow: 1,
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '1rem',
            }}
          />
          <input
            type="text"
            placeholder="Descripción"
            value={productoActual.descripcion}
            onChange={(e) => setProductoActual({ ...productoActual, descripcion: e.target.value })}
            style={{
              flexGrow: 1,
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '1rem',
            }}
          />
          <input
            type="number"
            placeholder="Stock"
            value={productoActual.stock}
            onChange={(e) => setProductoActual({ ...productoActual, stock: parseInt(e.target.value) })}
            required
            style={{
              flexGrow: 1,
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '1rem',
            }}
          />
          <input
            type="number"
            placeholder="Categoría ID"
            value={productoActual.categoriaId}
            onChange={(e) => setProductoActual({ ...productoActual, categoriaId: parseInt(e.target.value) })}
            required
            style={{
              flexGrow: 1,
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '1rem',
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 16px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1976d2')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#2196f3')}
          >
            {modoEdicion ? 'Actualizar' : 'Agregar'}
          </button>
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
