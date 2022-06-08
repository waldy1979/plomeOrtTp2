const axios = require('axios')
const { assert } = require('chai')
const { Building } = require('../src/db/models')
const { buildingIsUnique } = require('../src/controllers/buildings.controller')

describe('Building is Unique', () => {
	let id
	beforeEach(async () => {
		const { dataValues: building } = await Building.create({
			address: 'abc',
			city: 'def',
			manager: 'a',
			cellPhone: 'a',
			AdministrationId: 1,
		})
		id = building.id
	})

	afterEach(async () => {
		await Building.destroy({ where: { id } })
	})

	it('Debe devolver FALSE si le paso el que ya existe', async () => {
		assert.equal(await buildingIsUnique('abc', 'def'), false)
	})

	it('Debe devolver TRUE si le paso uno que no hay', async () => {
		assert.equal(await buildingIsUnique('kuhtcrchk', 'kuhtcrchk'), true)
	})
})

describe('Building Create', () => {
	/*
  Debe incluir los siguientes campos: 
  - address: String 50 caracteres, requerido
  - city: String 40 caracteres, requerido
  - manager: String 40 caracteres,  requerido
  - cellPhone: String 40 caracteres, requerido
  Al agregar un domicilio se debe verificar que no exista previamente, siendo los campos identificatorios la combinación del address + city.
  Al agregar el domicilio se debe elegir la administración que usa, verificando su existencia previa.
  */

	it('Si se completan los caracteres MÍNIMOS por campo debe permitir la carga ', async () => {
		const building = {
			address: 'a',
			city: 'a',
			manager: 'a',
			cellPhone: 'a',
			AdministrationId: 1,
		}

		try {
			const {
				status,
				data: {
					building: { id },
				},
			} = await axios.post('http://localhost:2999/buildings', building)
			assert.equal(status, 201)
			await Building.destroy({ where: { id } })
		} catch (error) {
			console.log(error.message)
			assert.equal(error.message, '')
		}
	})

	it('Si se completan los caracteres MÁXIMOS por campo debe permitir la carga ', async () => {
		const building = {
			address: 'abcde12345fghij67890abcde12345fghij67890abcde12345',
			city: 'abcde12345fghij67890abcde12345fghij67890',
			manager: 'abcde12345fghij67890abcde12345fghij67890',
			cellPhone: 'abcde12345fghij67890abcde12345fghij67890',
			AdministrationId: 1,
		}
		try {
			const {
				status,
				data: {
					building: { id },
				},
			} = await axios.post('http://localhost:2999/buildings', building)
			assert.equal(status, 201)
			await Building.destroy({ where: { id } })
		} catch (error) {
			console.log(error.message)
			assert.equal(error.message, '')
		}
	})

	it('Si falta address, no debe permitir la carga ', async () => {
		const building = {
			address: null,
			city: 'Test',
			manager: 'Test',
			cellPhone: 'Test',
			AdministrationId: 1,
		}
		try {
			await axios.post('http://localhost:2999/buildings', building)
		} catch (error) {
			assert.equal(error.response.status, 422)
		}
	})

	it('Si el address tiene mas de 50 caracteres no debe permitir la carga ', async () => {
		const building = {
			address: 'abcde12345fghij67890abcde12345fghij67890abcde12345+',
			city: 'Test',
			manager: 'Test',
			cellPhone: 'Test',
			AdministrationId: 1,
		}
		try {
			await axios.post('http://localhost:2999/buildings', building)
		} catch (error) {
			assert.equal(error.response.status, 422)
		}
	})

	it('Si falta city, no debe permitir la carga ', async () => {
		const building = {
			address: 'Test',
			city: null,
			manager: 'Test',
			cellPhone: 'Test',
			AdministrationId: 1,
		}
		try {
			await axios.post('http://localhost:2999/buildings', building)
		} catch (error) {
			assert.equal(error.response.status, 422)
		}
	})

	it('Si el city tiene mas de 40 caracteres no debe permitir la carga ', async () => {
		const building = {
			address: 'Test',
			city: 'abcde12345fghij67890abcde12345fghij67890+',
			manager: 'Test',
			cellPhone: 'Test',
			AdministrationId: 1,
		}
		try {
			await axios.post('http://localhost:2999/buildings', building)
		} catch (error) {
			assert.equal(error.response.status, 422)
		}
	})

	it('Si falta manager, no debe permitir la carga ', async () => {
		const building = {
			address: 'Test',
			city: 'Test',
			manager: null,
			cellPhone: 'Test',
			AdministrationId: 1,
		}
		try {
			await axios.post('http://localhost:2999/buildings', building)
		} catch (error) {
			assert.equal(error.response.status, 422)
		}
	})

	it('Si el manager tiene mas de 40 caracteres no debe permitir la carga ', async () => {
		const building = {
			address: 'Test',
			city: 'Test',
			manager: 'abcde12345fghij67890abcde12345fghij67890+',
			cellPhone: 'Test',
			AdministrationId: 1,
		}
		try {
			await axios.post('http://localhost:2999/buildings', building)
		} catch (error) {
			assert.equal(error.response.status, 422)
		}
	})

	it('Si falta cellPhone, no debe permitir la carga ', async () => {
		const building = {
			address: 'Test',
			city: 'Test',
			manager: 'Test',
			cellPhone: null,
			AdministrationId: 1,
		}
		try {
			await axios.post('http://localhost:2999/buildings', building)
		} catch (error) {
			assert.equal(error.response.status, 422)
		}
	})

	it('Si el cellPhone tiene mas de 40 caracteres no debe permitir la carga ', async () => {
		const building = {
			address: 'Test',
			city: 'Test',
			manager: 'Test',
			cellPhone: 'abcde12345fghij67890abcde12345fghij67890+',
			AdministrationId: 1,
		}
		try {
			await axios.post('http://localhost:2999/buildings', building)
		} catch (error) {
			assert.equal(error.response.status, 422)
		}
	})

	it('Si se cargan dos edificios con la misma dirección no permite la carga', async () => {
		const building = {
			address: 'abc',
			city: 'def',
			manager: 'a',
			cellPhone: 'a',
			AdministrationId: 1,
		}
		const {
			dataValues: { id },
		} = await Building.create(building)
		try {
			const { status, data } = await axios.post(
				'http://localhost:2999/buildings',
				building,
			)
		} catch (error) {
			assert.equal(error.response.status, 422)
			await Building.destroy({ where: { id } })
		}
	})
})
