module.exports = (sequelize, DataTypes) => {
  const Movimiento = sequelize.define("Movimiento", {
    tipo: {
      type: DataTypes.ENUM('ingreso', 'egreso'),
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  Movimiento.associate = (models) => {
    Movimiento.belongsTo(models.Producto, {
      foreignKey: 'productoId',
      as: 'producto',
    });
  };

  return Movimiento;
};