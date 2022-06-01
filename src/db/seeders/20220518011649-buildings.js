'use strict'
const {
	randAddress,
	randFullName,
	randPhoneNumber,
	randNumber,
} = require('@ngneat/falso')

module.exports = {
	async up(queryInterface, Sequelize) {
		let buildings = []

		for (let index = 0; index < 100; index++) {
			const bulkAddress = randAddress()
			buildings.push({
				address: bulkAddress.street,
				city: bulkAddress.city,
				manager: randFullName(),
				cellPhone: randPhoneNumber({ countryCode: 'AR' }),
				administrationId: randNumber({ min: 1, max: 20 }),
				createdAt: new Date(),
				updatedAt: new Date(),
			})
		}
		await queryInterface.bulkInsert('buildings', buildings, {})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('buildings', null, {})
	},
}

// npx sequelize-cli db:seed:all
