'use strict'
const { randFirstName, randNumber, randEmail } = require('@ngneat/falso')
module.exports = {
	async up(queryInterface, Sequelize) {
		let administrations = []

		for (let i = 0; i < 20; i++) {
			administrations.push({
				name: randFirstName(),
				email: randEmail(),
				discount: randNumber({ min: 1, max: 15 }),
				administratorId: randNumber({ min: 1, max: 19 }),
				addressId: randNumber({ min: 1, max: 20 }),
				state: 'alta',
				createdAt: new Date(),
				updatedAt: new Date(),
			})
		}
		await queryInterface.bulkInsert('administrations', administrations, {})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('administrations', null, {})
	},
}
