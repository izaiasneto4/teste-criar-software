"use strict";module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('products', 'avatar_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('products', 'avatar_id');
  },
};
