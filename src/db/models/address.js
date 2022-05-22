'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Address.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },     
    address: {
      type: DataTypes.STRING(50),
      allowNull: false,
    }, 
    address2: {
      type: DataTypes.STRING(50),
      allowNull: false,
    }, 
    locality: {
      type: DataTypes.STRING(50),
      allowNull: false,
    }, 
    postCode: {
      type: DataTypes.STRING(50),        
    }, 
    country: {
      type: DataTypes.STRING(30),        
    },     
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};