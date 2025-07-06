import React from 'react';

const CategoriaCard = ({ categoria }) => {
  const { nombre, productos = [] } = categoria;

  return (
    <div className="border rounded-xl p-4 shadow-md bg-blue-50">
      <h3 className="text-lg font-semibold mb-2">{nombre}</h3>

      {productos.length > 0 ? (
        <ul className="space-y-1">
          {productos.map((producto) => (
            <li key={producto.id} className="text-sm flex justify-between">
              <span>{producto.nombre}</span>
              <span className="text-gray-600">Stock: {producto.stock}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No hay productos en esta categoría.</p>
      )}
    </div>
  );
};

export default CategoriaCard;