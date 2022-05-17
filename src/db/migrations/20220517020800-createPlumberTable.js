'use strict';

const { DataTypes, Sequelize } = require("sequelize/types");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('plumbers', {
      plumberId: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      typeId: {
        type: Sequelize.DataTypes.ENUM('dni', 'le', 'otro'),
        allowNull: false,
      },
      identificationNumber: {
        type: Sequelize.DataTypes.STRING(15),
        allowNull: false,
      },
      firstName: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      birthDate: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      Nationality: {
        type: Sequelize.DataTypes.STRING(30),
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

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('plumbers');
  }
};
