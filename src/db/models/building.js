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
			// define association here
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
			locality: {
				type: DataTypes.STRING(40),
				allowNull: false,
			},
			attendant: {
				type: DataTypes.STRING(40),
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
