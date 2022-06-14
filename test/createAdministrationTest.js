const axios = require('axios')
const { assert } = require('chai')
const { Administration } = require('../src/db/models')
const { administrationIsUnique } = require('../src/controllers/administrations.controller')

describe('Administration is Unique', () => {
	let administration
  /*
  "id": 1,
  "name": "Alex",
  "email": "lilian.gunnarsson@sky.de",
  "discount": 5,
  "AdministratorId": 15,
  "addressId": 18,
  "state": "alta", */
	beforeEach(async () => {
		administration = await Administration.create({
			name: 'Magallanes',
			email: 'lilian.gunnarsson@sky.de',
			discount: 8,
			AdministratorId: 3,
			addressId: 1,
      state:"alta"
		})
	})

	afterEach(async () => {
		await administration.destroy()
	})

	it('Debe devolver FALSE si le paso una que ya existe', async () => {
		assert.equal(await administrationIsUnique('magallanes'), false)
	})

	it('Debe devolver TRUE si le paso una que no hay', async () => {
		assert.equal(await administrationIsUnique('katchatka'), true)
	})
})

describe('Administration Create', () => {
	/*
  Debe incluir los siguientes campos: 
- name: String 50 caracteres, requerido
- email: String 50 caracteres, requerido
- discount: Float, no  requerido
-administratorId: Integer, requerido
-addressId: Integer, requerido
-state: Enum, requerido
  Al agregar la direccion (addressId) se debe verificar que exista previamente
  Al agregar el administrador (administratorId) se debe verificar que exista previamente

*/
 

	it('Si se completan los caracteres MÍNIMOS por campo debe permitir la carga ', async () => {
		const administration = {
			name: 'Magallanes',
			email: 'lilian.gunnarsson@sky.de',
			discount: 8,
			AdministratorId: 3,
			addressId: 1,
      state:"alta"
		}

		try {
			const {
				status,
				data: {
					administration: { id },
				},
			} = await axios.post('http://localhost:2999/administrations', administration)
			assert.equal(status, 201)
			await Administration.destroy({ where: { id } })
		} catch (error) {
			console.log(error.message)
			assert.equal(error.message, '')
		}
	})

	it('Si se completan los caracteres MÁXIMOS por campo debe permitir la carga ', async () => {
		const administration = {
			name: 'abcde12345fghij67890abcde12345fghij67890abcde12345',
			email: 'abcde12345fghij67890abcde12345fghij67890abcde12345',
			discount: 2,
			addressId: 1,
			AdministratorId: 1,
		}
		try {
			const {
				status,
				data: {
					administration: { id },
				},
			} = await axios.post('http://localhost:2999/administrations', administration)
			assert.equal(status, 201)
			await Administration.destroy({ where: { id } })
		} catch (error) {
			console.log(error.message)
			assert.equal(error.message, '')
		}
	})

	it('Si falta addressId, no debe permitir la carga ', async () => {
		const administration = {
			name: 'Magallanes',
			email: 'lilian.gunnarsson@sky.de',
			discount: 8,
			AdministratorId: 3,			
      state:"alta"
		}
		try {
			await axios.post('http://localhost:2999/administrations', administration)
		} catch (error) {
			assert.equal(error.response.status, 422)
		}
	})
  it('Si falta administratorId, no debe permitir la carga ', async () => {
		const administration = {
			name: 'Magallanes',
			email: 'lilian.gunnarsson@sky.de',
			discount: 8,
			addressId: 3,
      AdministratorId: null,			
      state:"alta"
		}
		try {
			await axios.post('http://localhost:2999/administrations', administration)
		} catch (error) {
			assert.equal(error.response.status, 422)
		}
	})
})
