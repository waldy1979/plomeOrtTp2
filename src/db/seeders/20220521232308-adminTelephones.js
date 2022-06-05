'use strict'
const { randPhoneNumber, randNumber } = require('@ngneat/falso')
module.exports = {
	async up(queryInterface, Sequelize) {
		let adminTelephones = []

		for (let i = 0; i < 20; i++) {
			adminTelephones.push({
				phone: randPhoneNumber(),
				description: 'contacto',
				administrationId: randNumber({ min: 1, max: 19 }),
				createdAt: new Date(),
				updatedAt: new Date(),
			})
		}
		await queryInterface.bulkInsert('admintelephones', adminTelephones, {})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('admintelephones', null, {})
	},
}
