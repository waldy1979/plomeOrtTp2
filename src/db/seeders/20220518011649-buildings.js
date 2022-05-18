'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'buildings',
			[
				{
					address: 'Rivadavia 123',
					locality: 'CABA',
					attendant: 'Pepe',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					address: 'Sarmiento 254',
					locality: 'CABA',
					attendant: 'Cacho',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{},
		)
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
}
