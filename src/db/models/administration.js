'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Administration extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Administration.hasMany(models.Building)
			Administration.belongsTo(models.Administrator)
			Administration.belongsTo(models.Address)
			Administration.hasMany(models.AdminTelephone)
		}
	}
	Administration.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			discount: {
				type: DataTypes.FLOAT,
				default: 0,
			},
			administratorId: {
				type: DataTypes.INTEGER,
				references: {
					model: {
						tableName: 'administrators',
					},
					key: 'id',
				},
				allowNull: false,
			},
			addressId: {
				type: DataTypes.INTEGER,
				references: {
					model: {
						tableName: 'addresses',
					},
					key: 'id',
				},
				allowNull: false,
			},
			state: {
				type: DataTypes.ENUM('alta', 'baja'),
				defaultValue: 'alta',
				allowNull: false,
			},
			createdAt: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
		},
		{
			sequelize,
			modelName: 'Administration',
		},
	)
	return Administration
}
