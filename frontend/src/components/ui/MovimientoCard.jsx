import React, { useState } from 'react';

const MovimientoCard = ({ movimiento, onEditar }) => {
  const { id, tipo, cantidad, producto, productoId, createdAt } = movimiento;
  const fechaFormateada = new Date(createdAt).toLocaleDateString('es-AR');

  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({ tipo, cantidad, productoId });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGuardar = () => {
    onEditar({ ...movimiento, ...form });
    setEditando(false);
  };

  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    backgroundColor: tipo === 'ingreso' ? '#e6f4ea' : '#f9e6e6',
  };

  const buttonBaseStyle = {
    backgroundColor: '#2196f3',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s',
    marginRight: '8px',
  };

  return (
    <div style={cardStyle}>
      {editando ? (
        <>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              Tipo:
              <select
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                style={{
                  marginLeft: '0.5rem',
                  padding: '4px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              >
                <option value="ingreso">Ingreso</option>
                <option value="egreso">Egreso</option>
              </select>
            </label>

            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              Cantidad:
              <input
                type="number"
                name="cantidad"
                value={form.cantidad}
                onChange={handleChange}
                style={{
                  marginLeft: '0.5rem',
                  padding: '4px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  width: '80px',
                }}
              />
            </label>

            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              Producto ID:
              <input
                type="number"
                name="productoId"
                value={form.productoId}
                onChange={handleChange}
                style={{
                  marginLeft: '0.5rem',
                  padding: '4px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  width: '80px',
                }}
              />
            </label>
          </div>

          <button
            onClick={handleGuardar}
            style={{ ...buttonBaseStyle, backgroundColor: '#4caf50' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#388e3c')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4caf50')}
          >
            Guardar
          </button>

          <button
            onClick={() => setEditando(false)}
            style={{ ...buttonBaseStyle, backgroundColor: '#ccc', color: '#333' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b3b3b3')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ccc')}
          >
            Cancelar
          </button>
        </>
      ) : (
        <>
          <h3 style={{ textTransform: 'capitalize', marginBottom: '0.5rem' }}>{tipo}</h3>
          <p><strong>ID:</strong> {id}</p>
          <p>Producto: <span style={{ fontWeight: '600' }}>{producto?.nombre || `#${productoId}`}</span></p>
          <p>Cantidad: <span style={{ fontWeight: '600' }}>{cantidad}</span></p>
          <p style={{ fontSize: '0.8rem', color: '#666' }}>Fecha: {fechaFormateada}</p>

          <button
            onClick={() => setEditando(true)}
            style={buttonBaseStyle}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1976d2')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2196f3')}
          >
            Editar
          </button>
        </>
      )}
    </div>
  );
};

export default MovimientoCard;
