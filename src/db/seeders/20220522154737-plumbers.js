'use strict'

const {
	randFirstName,
	randLastName,
	randNumber,
	randPhoneNumber,
	randStreetAddress,
	randCountry,
	randEmail,
	randPastDate,
} = require('@ngneat/falso')

module.exports = {
	async up(queryInterface, Sequelize) {
		let plumbers = []

		for (var i = 0; i < 20; i++) {
			plumbers.push({
				firstName: randFirstName(),
				lastName: randLastName(),
				birthDate: randPastDate(),
				nationality: randCountry(),
				email: randEmail(),
				identificationNumber: randNumber({ min: 500000, max: 50000000 }),
				celPhone: randPhoneNumber(),
				address: randStreetAddress(),
				createdAt: new Date(),
				updatedAt: new Date(),
			})
		}

		/* await para usar falsos */
		await queryInterface.bulkInsert('plumbers', plumbers, {})

		/* await para usar ingresos manuales */
		/* await queryInterface.bulkInsert('plumbers', [{

      firstName: 'John',
      lastName: 'Doe',
      birthDate: '1979/03/26',
      nationality: 'Argentina',
      email: 'a@a.com',
      identificationNumber: '123456',
      celPhone: '25362536',
      address: 'Yayay 240',
      createdAt: new Date,
      updatedAt: new Date,

    }], {}); */
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete('plumbers', null, {})
	},
}
