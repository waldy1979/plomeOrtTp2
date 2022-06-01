'use strict'
const {
	randFirstName,
	randLastName,
	randPhoneNumber,
	randEmail,
} = require('@ngneat/falso')
module.exports = {
	async up(queryInterface, Sequelize) {
		let administrators = []

		for (let i = 0; i < 20; i++) {
			administrators.push({
				name: randFirstName(),
				lastName: randLastName(),
				email: randEmail(),
				cellPhone: randPhoneNumber(),
				createdAt: new Date(),
				updatedAt: new Date(),
			})
		}
		await queryInterface.bulkInsert('administrators', administrators, {})
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('administrators', null, {})
	},
}
