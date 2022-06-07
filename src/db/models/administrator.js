'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Administrator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Administrator.hasOne(models.Administration)
    }
  }
  Administrator.init({    
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },     
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    }, 
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    }, 
    email: {
      type: DataTypes.STRING(50),        
    }, 
    cellPhone: {
      type: DataTypes.STRING(30),        
    },     
  }, {
    sequelize,
    modelName: 'Administrator',
  });
  return Administrator;
};