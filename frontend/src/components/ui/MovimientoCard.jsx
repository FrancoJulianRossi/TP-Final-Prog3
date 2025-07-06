import React from 'react';

const MovimientoCard = ({ movimiento }) => {
  const { tipo, cantidad, producto, createdAt } = movimiento;

  const fechaFormateada = new Date(createdAt).toLocaleDateString('es-AR');

  return (
    <div className={`border rounded-xl p-4 shadow-md ${tipo === 'ingreso' ? 'bg-green-100' : 'bg-red-100'}`}>
      <h3 className="text-lg font-semibold capitalize">{tipo}</h3>
      <p className="text-sm">Producto: <span className="font-medium">{producto?.nombre || 'Sin nombre'}</span></p>
      <p className="text-sm">Cantidad: <span className="font-medium">{cantidad}</span></p>
      <p className="text-xs text-gray-600">Fecha: {fechaFormateada}</p>
    </div>
  );
};

export default MovimientoCard;