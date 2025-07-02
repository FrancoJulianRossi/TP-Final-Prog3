module.exports = {
  getAll: (req, res) => {
    res.json([{ id: 1, nombre: 'Bebidas' }, { id: 2, nombre: 'Limpieza' }]);
  },

  create: (req, res) => {
    const categoria = req.body;
    console.log('Crear categoría:', categoria);
    res.status(201).json({ mensaje: 'Categoría creada', data: categoria });
  },
};