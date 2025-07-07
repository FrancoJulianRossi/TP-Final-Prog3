const ProductoCard = ({ producto, onEditar, onEliminar }) => {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '1rem',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <h3>{producto.nombre}</h3>
      <p>Stock: {producto.stock}</p>
      <p>Categoría: {producto.categoria?.nombre || 'Sin categoría'}</p>

      <button onClick={() => onEditar(producto)}>Editar</button>
      <button
        onClick={() => onEliminar(producto.id)}
        style={{ marginLeft: '10px', color: 'red' }}
      >
        Eliminar
      </button>
    </div>
  );
};

export default ProductoCard;