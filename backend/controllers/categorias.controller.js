const { Categoria, Producto } = require('../models');

module.exports = {
  getAll: async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      include: {
        model: Producto,
        as: 'productos',
        required: false // <- para que no filtre si no hay productos
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
  }
};