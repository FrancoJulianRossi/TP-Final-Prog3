import React, { useEffect, useState } from 'react';
import { getMovimientos, createMovimiento, updateMovimiento } from '../services/movimientoService';
import MovimientoCard from '../components/ui/MovimientoCard';

const MovimientosPage = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [error, setError] = useState(null);

  const [formVisible, setFormVisible] = useState(false);
  const [nuevoMovimiento, setNuevoMovimiento] = useState({
    tipo: 'ingreso',
    cantidad: '',
    productoId: '',
  });

  const cargarMovimientos = () => {
    getMovimientos()
      .then(setMovimientos)
      .catch(() => setError('Error al cargar los movimientos'));
  };

  useEffect(() => {
    cargarMovimientos();
  }, []);

  const handleAgregar = async (e) => {
    e.preventDefault();

    if (!nuevoMovimiento.tipo || !nuevoMovimiento.cantidad || !nuevoMovimiento.productoId) return;

    try {
      await createMovimiento({
        tipo: nuevoMovimiento.tipo,
        cantidad: parseInt(nuevoMovimiento.cantidad),
        productoId: parseInt(nuevoMovimiento.productoId),
      });
      setNuevoMovimiento({ tipo: 'ingreso', cantidad: '', productoId: '' });
      setFormVisible(false);
      cargarMovimientos();
    } catch (e) {
      console.error(e);
      alert('Error al registrar movimiento');
    }
  };

  const handleEditar = async (movimientoEditado) => {
    try {
      await updateMovimiento(movimientoEditado.id, {
        tipo: movimientoEditado.tipo,
        cantidad: parseInt(movimientoEditado.cantidad),
        productoId: parseInt(movimientoEditado.productoId),
      });

      cargarMovimientos();
    } catch (e) {
      console.error(e);
      alert('Error al actualizar movimiento');
    }
  };

  return (
    <div style={{ width: '100%', padding: '1rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Movimientos de inventario
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
        {formVisible ? 'Cancelar' : 'Registrar movimiento'}
      </button>

      {formVisible && (
        <form
          onSubmit={handleAgregar}
          style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}
        >
          <select
            value={nuevoMovimiento.tipo}
            onChange={(e) => setNuevoMovimiento({ ...nuevoMovimiento, tipo: e.target.value })}
            style={{
              flexGrow: 1,
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '1rem',
            }}
          >
            <option value="ingreso">Ingreso</option>
            <option value="egreso">Egreso</option>
          </select>

          <input
            type="number"
            placeholder="Cantidad"
            value={nuevoMovimiento.cantidad}
            onChange={(e) => setNuevoMovimiento({ ...nuevoMovimiento, cantidad: e.target.value })}
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
            placeholder="Producto ID"
            value={nuevoMovimiento.productoId}
            onChange={(e) => setNuevoMovimiento({ ...nuevoMovimiento, productoId: e.target.value })}
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

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'grid', gap: '1rem' }}>
        {movimientos.length === 0 && <p>No hay movimientos registrados.</p>}
        {movimientos.map(mov => (
          <MovimientoCard key={mov.id} movimiento={mov} onEditar={handleEditar} />
        ))}
      </div>
    </div>
  );
};

export default MovimientosPage;
