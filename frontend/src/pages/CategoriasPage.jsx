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
    <div style={{ width: '100%', padding: '1rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Categorías
      </h1>

      <button
        onClick={() => setFormVisible(!formVisible)}
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
        {formVisible ? 'Cancelar' : 'Nueva categoría'}
      </button>

      {formVisible && (
        <form
          onSubmit={handleAgregar}
          style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem' }}
        >
          <input
            type="text"
            placeholder="Nombre de la categoría"
            value={nombreNuevaCategoria}
            onChange={(e) => setNombreNuevaCategoria(e.target.value)}
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
            Agregar
          </button>
        </form>
      )}

      {loading && <p>Cargando categorías...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {categorias.map((categoria) => (
          <div
            key={categoria.id}
            style={{ position: 'relative', flex: '1 1 250px' }}
          >
            <CategoriaCard categoria={categoria} />
            <button
              onClick={() => handleEliminar(categoria.id)}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '0.3rem 0.6rem',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#d32f2f')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#f44336')}
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
