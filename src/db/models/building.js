'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Building extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Building.belongsTo(models.Administration)
			Building.hasMany(models.jobOrders)
		}
	}
	Building.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			address: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			city: {
				type: DataTypes.STRING(40),
				allowNull: false,
			},
			manager: {
				type: DataTypes.STRING(40),
				allowNull: false,
			},
			cellPhone: {
				type: DataTypes.STRING(40),
				allowNull: false,
			},
			administrationId: {
				type: DataTypes.INTEGER,
				references: {
					model: {
						tableName : 'administrations'
					} 
					key: 'id'
				}
				allowNull: false,
			},
			createdAt: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
			updatedAt: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
		},
		{
			sequelize,
			modelName: 'Building',
		},
	)
	return Building
}
