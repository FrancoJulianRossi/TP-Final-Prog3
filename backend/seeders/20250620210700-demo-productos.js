'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Productos', [
      {
        nombre: 'Televisor',
        descripcion: 'Smart TV 42 pulgadas',
        stock: 10,
        categoriaId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Arroz',
        descripcion: 'Paquete 1kg',
        stock: 50,
        categoriaId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Remera',
        descripcion: 'Algodón, talla M',
        stock: 20,
        categoriaId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Productos', null, {});
  }
};