'use strict';
const {randStreetAddress, randCity, randZipCode,randCountryCode,randCounty} = require('@ngneat/falso')
module.exports = {
  async up (queryInterface, Sequelize) {
    let addresses = []

    for (let i = 0; i < 40; i++) {
      addresses.push({
        address: randStreetAddress(),
        address2: randCounty(),
        locality:randCity(),
        postCode:randZipCode(),
        country:randCountryCode(),
        createdAt : new Date,
        updatedAt : new Date,
      })
    } 
    await queryInterface.bulkInsert('address', addresses, {});   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('address', null, {});
  }
};
