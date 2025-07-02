module.exports = {
  getAll: (req, res) => {
    res.json([{ id: 1, nombre: 'Producto 1', stock: 10 }]);
  },

  create: (req, res) => {
    const producto = req.body;
    console.log('Crear producto:', producto);
    res.status(201).json({ mensaje: 'Producto creado', data: producto });
  },

  update: (req, res) => {
    const { id } = req.params;
    const datosActualizados = req.body;
    console.log(`Actualizar producto ${id}:`, datosActualizados);
    res.json({ mensaje: `Producto ${id} actualizado` });
  },

  remove: (req, res) => {
    const { id } = req.params;
    console.log(`Eliminar producto ${id}`);
    res.json({ mensaje: `Producto ${id} eliminado` });
  },
};