import React, { useEffect, useState } from 'react';
import { getMovimientos, createMovimiento, updateMovimiento } from '../services/movimientoService';
import MovimientoCard from '../components/ui/MovimientoCard';

const MovimientosPage = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [error, setError] = useState(null);

  const cargarMovimientos = () => {
    getMovimientos()
      .then(setMovimientos)
      .catch(() => setError('Error al cargar los movimientos'));
  };

  useEffect(() => {
    cargarMovimientos();
  }, []);

  const handleRegistrar = async () => {
    const productoId = prompt('Ingrese ID del producto:');
    const tipo = prompt('Ingrese tipo (ingreso/egreso):');
    const cantidad = prompt('Ingrese cantidad:');

    if (!productoId || !tipo || !cantidad) return;

    try {
      await createMovimiento({ tipo, cantidad: parseInt(cantidad), productoId: parseInt(productoId) });
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
    <div>
  <h1 className="text-2xl font-bold mb-4">Movimientos de inventario</h1>
  <button
    onClick={handleRegistrar}
    style={{
      backgroundColor: '#4caf50',
      color: 'white',
      padding: '6px 12px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      marginBottom: '1rem',
    }}
  >
    Registrar movimiento
  </button>

  {error && <p className="text-red-500">{error}</p>}

  <div className="grid gap-4">
    {movimientos.length === 0 && <p>No hay movimientos registrados.</p>}
    {movimientos.map(mov => (
      <MovimientoCard key={mov.id} movimiento={mov} onEditar={handleEditar} />
    ))}
  </div>
</div>
  );
};

export default MovimientosPage;