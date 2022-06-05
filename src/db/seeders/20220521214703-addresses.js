'use strict'
const {
	randStreetAddress,
	randCity,
	randZipCode,
	randCountry,
	randCounty,
} = require('@ngneat/falso')
module.exports = {
	async up(queryInterface, Sequelize) {
		let addresses = []

		for (let i = 0; i < 20; i++) {
			addresses.push({
				address: randStreetAddress(),
				address2: randCounty(),
				locality: randCity(),
				postCode: randZipCode(),
				country: randCountry(),
				createdAt: new Date(),
				updatedAt: new Date(),
			})
		}
		await queryInterface.bulkInsert('addresses', addresses, {})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('addresses', null, {})
	},
}
