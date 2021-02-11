"use strict";'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      category: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })

 },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
 }
};
