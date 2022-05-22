'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  
     
    await queryInterface.createTable('administrators', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },     
      name: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      }, 
      lastName: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      }, 
      email: {
        type: Sequelize.DataTypes.STRING(50),        
      }, 
      cellPhone: {
        type: Sequelize.DataTypes.STRING(60),        
      },     
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
      },
    });    
    await queryInterface.createTable('address', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },     
      address: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      }, 
      address2: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      }, 
      locality: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      }, 
      postCode: {
        type: Sequelize.DataTypes.STRING(50),        
      }, 
      country: {
        type: Sequelize.DataTypes.STRING(100),        
      },     
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
      },
    });    
    await queryInterface.createTable('administrations', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },     
      name: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      administratorId: {
        type: Sequelize.DataTypes.INTEGER,
        references:{
          model:{
            tableName:'administrators'            
          },
          key:'id'
        },
        allowNull: false,
      }, 
      addressId: {
        type: Sequelize.DataTypes.INTEGER,
        references:{
          model:{
            tableName:'address'            
          },
          key:'id'
        },
        allowNull: false,
      },     
      state: {
        type: Sequelize.DataTypes.ENUM('alta', 'baja'),
        defaultValue: 'alta',
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
    });
    await queryInterface.createTable('admin_telephones', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      }, 
      phone: {
        type: Sequelize.DataTypes.STRING(60),
        allowNull: false,
      }, 
      description: {
        type: Sequelize.DataTypes.ENUM('contacto','emergencias'),
        allowNull: false,
      }, 
      administrationId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references:{
          model:{
            tableName:'administrations'            
          },
          key:'id'
        }
      },     
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
      },
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('admin_telephones');
    await queryInterface.dropTable('administrations'); 
    await queryInterface.dropTable('address'); 
    await queryInterface.dropTable('administrators');  
    
  }  
};
