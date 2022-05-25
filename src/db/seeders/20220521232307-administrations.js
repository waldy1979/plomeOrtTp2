'use strict';
const {randFirstName,  randNumber,randEmail} = require('@ngneat/falso')
module.exports = {
  async up (queryInterface, Sequelize) {
    let administrations = []

    for (let i = 0; i < 40; i++) {
      administrations.push({
        name: randFirstName(),
        email:randEmail(),
        discount:randNumber({min:1,max:15}),
        administratorId:randNumber({min:1,max:40}),
        addressId:randNumber({min:1,max:40}),
        state:'alta',
        createdAt : new Date,
        updatedAt : new Date,
      })
    }    
    await queryInterface.bulkInsert('administrations', administrations, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('administrations', null, {});
  }
};
