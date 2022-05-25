'use strict';
const {randPhoneNumber, randNumber} = require('@ngneat/falso')
module.exports = {
  async up (queryInterface, Sequelize) {
    let adminTelephones = []

    for (let i = 0; i < 40; i++) {
      adminTelephones.push({
        phone: randPhoneNumber(),
        description: "contacto",
        administrationId:randNumber({min:1,max:40}),
        createdAt : new Date,
        updatedAt : new Date,
      })
    } 
    await queryInterface.bulkInsert('admin_telephones', adminTelephones, {});  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admin_telephones', null, {});
  }
};
