module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define("Categoria", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Categoria.associate = (models) => {
    Categoria.hasMany(models.Producto, {
      foreignKey: 'categoriaId',
      as: 'productos',
      onDelete: 'CASCADE',
    });
  };

  return Categoria;
};