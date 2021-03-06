'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('buildings', {
			id: {
				type: Sequelize.DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			address: {
				type: Sequelize.DataTypes.STRING(50),
				allowNull: false,
			},
			city: {
				type: Sequelize.DataTypes.STRING(40),
				allowNull: false,
			},
			manager: {
				type: Sequelize.DataTypes.STRING(40),
				allowNull: false,
			},
			cellPhone: {
				type: Sequelize.DataTypes.STRING(40),
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
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('buildings')
	},
}

// npx sequelize-cli db:migrate
// npx sequelize-cli db:seed:all
