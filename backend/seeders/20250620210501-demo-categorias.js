'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categorias', [
      { nombre: 'Electrónica', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Alimentos', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Ropa', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categorias', null, {});
  }
};