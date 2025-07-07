const { Producto, Categoria, Movimiento } = require('../models');

module.exports = {
  getAll: async (req, res) => {
    try {
      const productos = await Producto.findAll({
        include: {
          model: Categoria,
          as: 'categoria',
          attributes: ['id', 'nombre'],
        },
      });
      res.json(productos);
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  create: async (req, res) => {
    try {
      const nuevoProducto = await Producto.create(req.body);
      if (nuevoProducto.stock > 0) {
        await Movimiento.create({
          tipo: 'ingreso',
          cantidad: nuevoProducto.stock,
          productoId: nuevoProducto.id,
        });
      }

      res.status(201).json({ mensaje: 'Producto creado', data: nuevoProducto });
    } catch (error) {
      console.error('Error al crear producto:', error);
      res.status(500).json({ error: 'Error al crear el producto' });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const [filasActualizadas] = await Producto.update(req.body, {
        where: { id }
      });

      if (filasActualizadas === 0) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
      }

      res.json({ mensaje: `Producto ${id} actualizado` });
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  },

  remove: async (req, res) => {
    try {
      const { id } = req.params;
      const filasEliminadas = await Producto.destroy({ where: { id } });

      if (filasEliminadas === 0) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
      }

      res.json({ mensaje: `Producto ${id} eliminado` });
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  },
};