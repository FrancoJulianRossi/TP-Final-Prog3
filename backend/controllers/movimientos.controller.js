const { Movimiento, Producto } = require('../models');

module.exports = {
  getAll: async (req, res) => {
    try {
      const movimientos = await Movimiento.findAll({
        include: {
          model: Producto,
          as: 'producto',
        },
        order: [['createdAt', 'DESC']]
      });
      res.json(movimientos);
    } catch (error) {
      console.error('🔥 ERROR EN /api/movimientos');
      console.error(error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  },

  create: async (req, res) => {
    try {
      const movimiento = await Movimiento.create(req.body);
      res.status(201).json({ mensaje: 'Movimiento registrado', data: movimiento });
    } catch (error) {
      console.error('Error al registrar movimiento:', error);
      res.status(500).json({ error: 'No se pudo registrar el movimiento' });
    }
  }
};
