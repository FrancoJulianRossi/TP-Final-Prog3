const ProductoCard = ({ producto, onEditar, onEliminar }) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1rem',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
      }}
    >
      <h3 style={{ marginBottom: '0.5rem', fontWeight: '600' }}>{producto.nombre}</h3>
      <p style={{ margin: '0.25rem 0' }}>
        <strong>ID:</strong> {producto.id}
      </p>
      <p style={{ margin: '0.25rem 0' }}>Stock: {producto.stock}</p>
      <p style={{ margin: '0.25rem 0' }}>
        Categoría: {producto.categoria?.nombre || 'Sin categoría'}
      </p>

      <button
        onClick={() => onEditar(producto)}
        style={{
          backgroundColor: '#2196f3',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          padding: '6px 12px',
          cursor: 'pointer',
          fontWeight: '600',
          transition: 'background-color 0.3s',
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1976d2')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#2196f3')}
      >
        Editar
      </button>

      <button
        onClick={() => onEliminar(producto.id)}
        style={{
          marginLeft: '10px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          padding: '6px 12px',
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
  );
};

export default ProductoCard;
