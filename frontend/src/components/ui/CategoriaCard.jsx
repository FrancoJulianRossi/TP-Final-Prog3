import React from 'react';

const CategoriaCard = ({ categoria }) => {
  const { nombre, productos = [] } = categoria;

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '1rem',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      backgroundColor: '#e6f0ff'  // un azul muy suave para diferenciarlo
    }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
        {nombre}
      </h3>

      {productos.length > 0 ? (
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', maxHeight: '150px', overflowY: 'auto' }}>
          {productos.map((producto) => (
            <li
              key={producto.id}
              style={{
                fontSize: '0.875rem',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.25rem 0',
                borderBottom: '1px solid #ddd',
              }}
            >
              <span>{producto.nombre}</span>
              <span style={{ color: '#555' }}>Stock: {producto.stock}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ fontSize: '0.875rem', color: '#888' }}>
          No hay productos en esta categoría.
        </p>
      )}
    </div>
  );
};

export default CategoriaCard;