'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('administrations', {
      adminId: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },     
      name: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },      
      telephone: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },      
      celPhone: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      address: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      state: {
        type: Sequelize.DataTypes.ENUM('alta', 'baja'),
        defaultValue: 'alta',
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
