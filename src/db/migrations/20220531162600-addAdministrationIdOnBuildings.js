'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('buildings', 'administrationId', {
			type: Sequelize.DataTypes.INTEGER,
			allowNull: false,
		})
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('buildings', 'administrationId')
	},
}
