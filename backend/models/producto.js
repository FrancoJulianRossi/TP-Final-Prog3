module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define("Producto", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: DataTypes.STRING,
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  Producto.associate = (models) => {
    Producto.belongsTo(models.Categoria, {
      foreignKey: 'categoriaId',
      as: 'categoria',
    });

    Producto.hasMany(models.Movimiento, {
      foreignKey: 'productoId',
      as: 'movimientos',
      onDelete: 'CASCADE',
    });
  };

  return Producto;
};