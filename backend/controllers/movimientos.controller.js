module.exports = {
  getAll: (req, res) => {
    res.json([
      { id: 1, tipo: 'ingreso', productoId: 1, cantidad: 5 },
      { id: 2, tipo: 'egreso', productoId: 1, cantidad: 2 },
    ]);
  },

  create: (req, res) => {
    const movimiento = req.body;
    console.log('Registrar movimiento:', movimiento);
    res.status(201).json({ mensaje: 'Movimiento registrado', data: movimiento });
  },
};