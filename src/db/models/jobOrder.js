'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class JobOrder extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			JobOrder.belongsTo(models.Building)
		}
	}
	JobOrder.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			buildingId: {
				type: DataTypes.INTEGER,
				references: {
					model: {
						tableName: 'buildings',
					},
					key: 'id',
				},
				allowNull: false,
			},
			plumberId: {
				type: DataTypes.INTEGER,
				references: {
					model: {
						tableName: 'plumbers',
					},
					key: 'id',
				},
				allowNull: false,
			},

			startingDate: DataTypes.DATE,
			endDate: DataTypes.DATE,
			state: DataTypes.ENUM('en curso', 'terminado'),
			isPayed: DataTypes.BOOLEAN,
			visitDate: DataTypes.DATE,
			visitTime: DataTypes.TIME,
			aptNumber: DataTypes.INTEGER,
			place: DataTypes.STRING,
			payment: DataTypes.INTEGER,
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
			modelName: 'JobOrder',
		},
	)
	return JobOrder
}
