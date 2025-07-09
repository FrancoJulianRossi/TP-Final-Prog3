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

  const buttonStyle = {
    marginRight: '8px',
    padding: '6px 12px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
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
                style={{ marginLeft: '0.5rem', padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
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
                style={{ marginLeft: '0.5rem', padding: '4px', borderRadius: '4px', border: '1px solid #ccc', width: '60px' }}
              />
            </label>

            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              Producto ID:
              <input
                type="number"
                name="productoId"
                value={form.productoId}
                onChange={handleChange}
                style={{ marginLeft: '0.5rem', padding: '4px', borderRadius: '4px', border: '1px solid #ccc', width: '60px' }}
              />
            </label>
          </div>

          <button
            onClick={handleGuardar}
            style={{ ...buttonStyle, backgroundColor: '#4caf50', color: 'white' }}
          >
            Guardar
          </button>
          <button
            onClick={() => setEditando(false)}
            style={{ ...buttonStyle, backgroundColor: '#ccc' }}
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
            style={{ marginTop: '0.5rem', color: '#007bff', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            Editar
          </button>
        </>
      )}
    </div>
  );
};

export default MovimientoCard;