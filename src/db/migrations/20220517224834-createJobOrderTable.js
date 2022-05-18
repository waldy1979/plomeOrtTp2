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
        references: {
          model: "buildings",
          key: "buildingId",
        },
        allowNull: false,
      },
      plumberId: { // FK
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: "plumbers",
          key: "plumberId",
        },
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
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
        allowNull: false,
      },
      payment: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: Sequelize.DataTypes.NOW,
        allowNull: false,
      },
      visitDate: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
        allowNull: false,
      },
      visitTime: {
        type: Sequelize.DataTypes.TIME,
        defaultValue: Sequelize.DataTypes.NOW,
        allowNull: false,
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
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
