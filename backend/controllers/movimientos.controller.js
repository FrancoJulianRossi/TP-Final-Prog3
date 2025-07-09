const { Movimiento, Producto } = require('../models');

module.exports = {
  getAll: async (req, res) => {
    try {
      const movimientos = await Movimiento.findAll({
        include: {
          model: Producto,
          as: 'producto',
          attributes: ['id', 'nombre', 'stock'],
        },
        order: [['createdAt', 'DESC']],
      });
      res.json(movimientos);
    } catch (error) {
      console.error('Error al obtener movimientos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  create: async (req, res) => {
    try {
      const nuevoMovimiento = await Movimiento.create(req.body);
      res.status(201).json({ mensaje: 'Movimiento creado', data: nuevoMovimiento });
    } catch (error) {
      console.error('Error al crear movimiento:', error);
      res.status(500).json({ error: 'Error al crear el movimiento' });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const [filasActualizadas] = await Movimiento.update(req.body, {
        where: { id },
      });

      if (filasActualizadas === 0) {
        return res.status(404).json({ mensaje: 'Movimiento no encontrado' });
      }

      res.json({ mensaje: `Movimiento ${id} actualizado` });
    } catch (error) {
      console.error('Error al actualizar movimiento:', error);
      res.status(500).json({ error: 'Error al actualizar el movimiento' });
    }
  },
};