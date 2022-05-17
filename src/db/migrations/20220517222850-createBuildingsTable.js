'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 */
		await queryInterface.createTable('buildings', {
			buildingId: {
				type: Sequelize.DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			address: {
				type: Sequelize.DataTypes.STRING(50),
				allowNull: false,
			},
			locality: {
				type: Sequelize.DataTypes.STRING(40),
				allowNull: false,
			},
			attendant: {
				type: Sequelize.DataTypes.STRING(40),
				allowNull: false,
			},
		})
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
	},
}
