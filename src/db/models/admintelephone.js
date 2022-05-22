'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdminTelephone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AdminTelephone.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }, 
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    }, 
    description: {
      type: DataTypes.ENUM('contacto','emergencias'),
      allowNull: false,
    }, 
    administrationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:{
          tableName:'administrations'            
        },
        key:'id'
      }
    }     
  }, {
    sequelize,
    modelName: 'AdminTelephone',
  });
  return AdminTelephone;
};