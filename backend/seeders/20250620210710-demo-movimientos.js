
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Movimientos', [
      {
        tipo: 'ingreso',
        cantidad: 10,
        productoId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tipo: 'ingreso',
        cantidad: 50,
        productoId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tipo: 'egreso',
        cantidad: 5,
        productoId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Movimientos', null, {});
  }
};