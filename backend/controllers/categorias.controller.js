const { Categoria, Producto } = require('../models');

module.exports = {
  getAll: async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      include: {
        model: Producto,
        as: 'productos',
        required: false 
      }
    });

    res.json(categorias);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
},

  create: async (req, res) => {
    try {
      const categoria = await Categoria.create(req.body);
      res.status(201).json({ mensaje: 'Categoría creada', data: categoria });
    } catch (error) {
      console.error('Error al crear categoría:', error);
      res.status(500).json({ error: 'No se pudo crear la categoría' });
    }
  },
  delete: async (req, res) => {
  try {
    const { id } = req.params;

    const eliminados = await Categoria.destroy({
      where: { id },
    });

    if (eliminados === 0) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.json({ mensaje: 'Categoría eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar categoría:', error);

    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({
        error: 'No se puede eliminar la categoría porque tiene productos asociados',
      });
    }

    res.status(500).json({ error: 'Error al eliminar la categoría' });
  }
},
};