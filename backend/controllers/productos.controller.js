const { Producto } = require('../models'); // Asegurate que la ruta es correcta

module.exports = {
  // Obtener todos los productos
    getAll: async (req, res) => {
    try {
      const productos = await Producto.findAll({
        include: {
          model: Categoria,
          as: 'categoria', // este alias debe coincidir con el definido en el modelo
          attributes: ['id', 'nombre'], // selecciona los campos que quieras mostrar
        },
      });
      res.json(productos);
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Crear un nuevo producto
  create: async (req, res) => {
    try {
      const nuevoProducto = await Producto.create(req.body);
      res.status(201).json({ mensaje: 'Producto creado', data: nuevoProducto });
    } catch (error) {
      console.error('Error al crear producto:', error);
      res.status(500).json({ error: 'Error al crear el producto' });
    }
  },

  // Actualizar un producto existente
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

  // Eliminar un producto
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