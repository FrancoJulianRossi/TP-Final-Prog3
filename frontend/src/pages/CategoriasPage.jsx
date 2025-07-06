import React, { useEffect, useState } from 'react';
import { getCategorias } from '../services/categoriaService';
import CategoriaCard from '../components/ui/CategoriaCard';

const CategoriasPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  getCategorias()
    .then((data) => {
      setCategorias(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error('Error en getCategorias:', err);
      setError('Error al cargar categorías');
      setLoading(false);
    });
}, []);

  return (
    <div>
      <h1>Categorías</h1>
      <button>Nueva categoría</button>

      {loading && <p>Cargando categorías...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
        {categorias.map((categoria) => (
          <CategoriaCard key={categoria.id} categoria={categoria} />
        ))}
      </div>
    </div>
  );
};

export default CategoriasPage;