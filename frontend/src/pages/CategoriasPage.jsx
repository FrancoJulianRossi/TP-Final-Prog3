import React, { useEffect, useState } from 'react';
import {
  getCategorias,
  createCategoria,
  deleteCategoria,
} from '../services/categoriaService';
import CategoriaCard from '../components/ui/CategoriaCard';

const CategoriasPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nombreNuevaCategoria, setNombreNuevaCategoria] = useState('');
  const [formVisible, setFormVisible] = useState(false);

  const cargarCategorias = async () => {
    try {
      const data = await getCategorias();
      setCategorias(data);
    } catch (err) {
      console.error('Error en getCategorias:', err);
      setError('Error al cargar categorías');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const handleEliminar = async (id) => {
    try {
      await deleteCategoria(id);
      cargarCategorias();
    } catch (err) {
      console.error('Error al eliminar categoría:', err);
      alert('No se pudo eliminar la categoría');
    }
  };

  const handleAgregar = async (e) => {
    e.preventDefault();
    if (!nombreNuevaCategoria.trim()) return;

    try {
      await createCategoria({ nombre: nombreNuevaCategoria });
      setNombreNuevaCategoria('');
      setFormVisible(false);
      cargarCategorias();
    } catch (err) {
      console.error('Error al crear categoría:', err);
      alert('No se pudo crear la categoría');
    }
  };

  return (
    <div>
      <h1>Categorías</h1>

      <button onClick={() => setFormVisible(!formVisible)}>
        {formVisible ? 'Cancelar' : 'Nueva categoría'}
      </button>

      {formVisible && (
        <form onSubmit={handleAgregar} style={{ marginTop: '1rem' }}>
          <input
            type="text"
            placeholder="Nombre de la categoría"
            value={nombreNuevaCategoria}
            onChange={(e) => setNombreNuevaCategoria(e.target.value)}
            required
          />
          <button type="submit">Agregar</button>
        </form>
      )}

      {loading && <p>Cargando categorías...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
        {categorias.map((categoria) => (
          <div key={categoria.id} style={{ position: 'relative' }}>
            <CategoriaCard categoria={categoria} />
            <button
              onClick={() => handleEliminar(categoria.id)}
              style={{
                position: 'absolute',
                top: 5,
                right: 5,
                background: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '0.2rem 0.5rem',
                cursor: 'pointer',
              }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriasPage;