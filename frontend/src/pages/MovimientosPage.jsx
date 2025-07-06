import React, { useEffect, useState } from 'react';
import { getMovimientos } from '../services/movimientoService';
import MovimientoCard from '../components/ui/MovimientoCard';

const MovimientosPage = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMovimientos()
      .then(setMovimientos)
      .catch(() => setError('Error al cargar los movimientos'));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Movimientos de inventario</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Registrar movimiento</button>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4">
        {movimientos.length === 0 && <p>No hay movimientos registrados.</p>}
        {movimientos.map(mov => (
          <MovimientoCard key={mov.id} movimiento={mov} />
        ))}
      </div>
    </div>
  );
};

export default MovimientosPage;