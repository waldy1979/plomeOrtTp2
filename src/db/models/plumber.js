'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plumber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Plumber.hasMany(models.JobOrder)
    }
  }
  Plumber.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    identificationNumber: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    nationality: DataTypes.STRING,
    celPhone: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Plumber',
  });
  return Plumber;
};