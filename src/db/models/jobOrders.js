'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jobOrders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  jobOrders.init({
    id: DataTypes.INTEGER,
    buildingId: DataTypes.INTEGER,
    plumberId: DataTypes.INTEGER,
    startingDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    state: DataTypes.ENUM('en curso', 'terminado'),
    isPayed: DataTypes.BOOLEAN,
    visitDate: DataTypes.DATE,
    visitTime: DataTypes.TIME,
    aptNumber: DataTypes.INTEGER,
    place: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'jobOrders',
  });
  return jobOrders;
};