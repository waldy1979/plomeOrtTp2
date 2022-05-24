'use strict';

const { randBetweenDate, randNumber, randBoolean, randCity } = require('@ngneat/falso');

module.exports = {
  async up(queryInterface, Sequelize) {

    let jobOrders = []

    for (var i = 0; i < 400; i++) {
      jobOrders.push({
        buildingId: randNumber({ min: 1, max: 9999 }),
        plumberId: randNumber({ min: 1, max: 9999 }),
        startingDate: randBetweenDate({ from: new Date('05/01/2022'), to: new Date('05/20/2022') }),
        endDate: randBetweenDate({ from: new Date('05/21/2022'), to: new Date('30/12/2022') }),
        state: 'En Curso',
        payment: randNumber({ min: 1000, max: 100000 }),
        isPayed: false,
        visitDate: randBetweenDate({ from: new Date('05/01/2022'), to: new Date('05/20/2022') }),
        visitTime: '16:20',
        aptNumber: randNumber({ min: 1, max: 100 }),
        place: randCity(),
        createdAt: new Date,
        updatedAt: new Date,
      })
    }

    await queryInterface.bulkInsert('jobOrders', jobOrders, {});


  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('jobOrders', null, {});

  }
};
