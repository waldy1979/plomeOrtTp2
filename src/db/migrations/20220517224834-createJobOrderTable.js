'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable('jobOrders', {
      id: { // PK
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      buildingId: { // FK
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      plumberId: { // FK
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      startingDate: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
        allowNull: false,
      },
      state: {
        type: Sequelize.DataTypes.ENUM('en curso', 'terminado'),
        defaultValue: Sequelize.DataTypes.NOW,
        allowNull: false,
      },
      payment: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      isPayed: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      visitDate: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
        allowNull: true,
      },
      visitTime: {
        type: Sequelize.DataTypes.TIME,
        defaultValue: Sequelize.DataTypes.NOW,
        allowNull: true,
      },
      aptNumber: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: Sequelize.DataTypes.NOW,
        allowNull: false,
      },
      place: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: Sequelize.DataTypes.NOW,
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

    await queryInterface.dropTable('jobOrders')
  }
};
