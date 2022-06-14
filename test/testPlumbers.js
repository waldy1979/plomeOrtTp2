const axios = require('axios')
const { assert } = require('chai')
const { Plumber } = require('../src/db/models')
const { plumberIsUnique } = require('../src/controllers/plumbers.controller')

describe('Plumber is Unique', () => {
    let plumber

    beforeEach(async () => {
        plumber = await Plumber.create({
            typeId: 'dni',
            identificationNumber: '123',
            firstName: 'Juan',
            lastName: 'Gomez',
            email: 'a@a.com',
            birthDate: new Date,
            nationality: 'Argentina',
            celPhone: '01144444444',
            address: 'yatay 240'
        })
    })

    afterEach(async () => {
        await plumber.destroy()
    })

    it('Debe devolver FALSE si le paso el que ya existe', async () => {
        assert.equal(await plumberIsUnique('123'), false)
    })

    it('Debe devolver TRUE si le paso uno que no hay', async () => {
        assert.equal(await plumberIsUnique('456'), true)
    })
})

describe('Plumber Create', () => {
    /*
  Debe incluir los siguientes campos: 
  - identificationNumber: String 15 caracteres, requerido
  - firstName: String 50 caracteres, requerido
  - lastName: String 50 caracteres, requerido
  - email: String 50 caracteres, requerido
  - birthDate: Date, requerido
  - nationality: String 75 caracteres, requerido
  - celPhone: String 50 caracteres, requerido
  - address: String 50 caracteres, requerido
   */

    it('Si se completan los caracteres MÍNIMOS por campo debe permitir la carga ', async () => {
        const plumber = {
            typeId: 'dni',
            identificationNumber: '1',
            firstName: 'a',
            lastName: 'a',
            email: 'a',
            birthDate: new Date,
            nationality: 'a',
            celPhone: '1',
            address: 'a'
        }

        try {
            const {
                status,
                data: {
                    plumber: { id },
                },
            } = await axios.post('http://localhost:2999/plumbers', plumber)
            assert.equal(status, 201)
            await Plumber.destroy({ where: { id } })
        } catch (error) {
            console.log(error.message)
            assert.equal(error.message, '')
        }
    })

    it('Si se completan los caracteres MÁXIMOS por campo debe permitir la carga ', async () => {
        const plumber = {
            typeId: 'dni',
            identificationNumber: '123456789012345',
            firstName: '12345678901234567890123456789012345678901234567890',
            lastName: '12345678901234567890123456789012345678901234567890',
            email: '12345678901234567890123456789012345678901234567890',
            birthDate: '11-11-1911',
            nationality: '123456789012345678901234567890123456789012345678901234567890123456789012345',
            celPhone: '12345678901234567890123456789012345678901234567890',
            address: '12345678901234567890123456789012345678901234567890'
        }
        try {
            const {
                status,
                data: {
                    plumber: { id },
                },
            } = await axios.post('http://localhost:2999/plumbers', plumber)
            assert.equal(status, 201)
            await Plumber.destroy({ where: { id } })
        } catch (error) {
            console.log(error.message)
            assert.equal(error.message, '')
        }
    })

    it('Si falta identificationNumber, no debe permitir la carga ', async () => {
        const plumber = {
            typeId: 'dni',
            identificationNumber: null,
            firstName: 'Test',
            lastName: 'Test',
            email: 'Test',
            birthDate: '11-11-1911',
            nationality: 'Test',
            celPhone: 'Test',
            address: 'Test'
        }
        try {
            await axios.post('http://localhost:2999/plumbers', plumber)
        } catch (error) {
            assert.equal(error.response.status, 422)
        }
    })

    it('Si el identificationNumber tiene mas de 15 caracteres no debe permitir la carga ', async () => {
        const plumber = {
            typeId: 'dni',
            identificationNumber: '1234567890123456',
            firstName: 'Test',
            lastName: 'Test',
            email: 'Test',
            birthDate: '11-11-1911',
            nationality: 'Test',
            celPhone: 'Test',
            address: 'Test'
        }
        try {
            await axios.post('http://localhost:2999/plumbers', plumber)
        } catch (error) {
            assert.equal(error.response.status, 422)
        }
    })

    it('Si falta firstName, no debe permitir la carga ', async () => {
        const plumber = {
            typeId: 'dni',
            identificationNumber: 'Test',
            firstName: null,
            lastName: 'Test',
            email: 'Test',
            birthDate: '11-11-1911',
            nationality: 'Test',
            celPhone: 'Test',
            address: 'Test'
        }
        try {
            await axios.post('http://localhost:2999/plumbers', plumber)
        } catch (error) {
            assert.equal(error.response.status, 422)
        }
    })

    it('Si el firstName tiene mas de 50 caracteres no debe permitir la carga ', async () => {
        const plumber = {
            typeId: 'dni',
            identificationNumber: 'Test',
            firstName: '123456789012345678901234567890123456789012345678901',
            lastName: 'Test',
            email: 'Test',
            birthDate: '11-11-1911',
            nationality: 'Test',
            celPhone: 'Test',
            address: 'Test'
        }
        try {
            await axios.post('http://localhost:2999/plumbers', plumber)
        } catch (error) {
            assert.equal(error.response.status, 422)
        }
    })

    it('Si falta lastName, no debe permitir la carga ', async () => {
        const plumber = {
            typeId: 'dni',
            identificationNumber: 'Test',
            firstName: 'Test',
            lastName: null,
            email: 'Test',
            birthDate: '11-11-1911',
            nationality: 'Test',
            celPhone: 'Test',
            address: 'Test'
        }
        try {
            await axios.post('http://localhost:2999/plumbers', plumber)
        } catch (error) {
            assert.equal(error.response.status, 422)
        }
    })

    it('Si el lastName tiene mas de 50 caracteres no debe permitir la carga ', async () => {
        const plumber = {
            typeId: 'dni',
            identificationNumber: 'Test',
            firstName: 'Test',
            lastName: '123456789012345678901234567890123456789012345678901',
            email: 'Test',
            birthDate: '11-11-1911',
            nationality: 'Test',
            celPhone: 'Test',
            address: 'Test'
        }
        try {
            await axios.post('http://localhost:2999/plumbers', plumber)
        } catch (error) {
            assert.equal(error.response.status, 422)
        }
    })

    it('Si falta email, no debe permitir la carga ', async () => {
        const plumber = {
            typeId: 'dni',
            identificationNumber: 'Test',
            firstName: 'Test',
            lastName: 'Test',
            email: null,
            birthDate: '11-11-1911',
            nationality: 'Test',
            celPhone: 'Test',
            address: 'Test'
        }
        try {
            await axios.post('http://localhost:2999/plumbers', plumber)
        } catch (error) {
            assert.equal(error.response.status, 422)
        }
    })

    it('Si el email tiene mas de 50 caracteres no debe permitir la carga ', async () => {
        const plumber = {
            typeId: 'dni',
            identificationNumber: 'Test',
            firstName: 'Test',
            lastName: 'Test',
            email: '123456789012345678901234567890123456789012345678901',
            birthDate: '11-11-1911',
            nationality: 'Test',
            celPhone: 'Test',
            address: 'Test'
        }
        try {
            await axios.post('http://localhost:2999/plumbers', plumber)
        } catch (error) {
            assert.equal(error.response.status, 422)
        }
    })


    it('Si falta cellPhone, no debe permitir la carga ', async () => {
        const plumber = {
            typeId: 'dni',
            identificationNumber: 'Test',
            firstName: 'Test',
            lastName: 'Test',
            email: 'Test',
            birthDate: '11-11-1911',
            nationality: 'Test',
            celPhone: null,
            address: 'Test'
        }
        try {
            await axios.post('http://localhost:2999/plumbers', plumber)
        } catch (error) {
            assert.equal(error.response.status, 422)
        }
    })

    it('Si el cellPhone tiene mas de 50 caracteres no debe permitir la carga ', async () => {
        const plumber = {
            typeId: 'dni',
            identificationNumber: 'Test',
            firstName: 'Test',
            lastName: 'Test',
            email: 'Test',
            birthDate: '11-11-1911',
            nationality: 'Test',
            celPhone: '123456789012345678901234567890123456789012345678901',
            address: 'Test'
        }
        try {
            await axios.post('http://localhost:2999/plumbers', plumber)
        } catch (error) {
            assert.equal(error.response.status, 422)
        }
    })

    it.skip('Si se cargan dos plomeros con el mismo nombre y apellido informar posible error de duplicado', async () => {
        const plumber = {
            typeId: 'dni',
            identificationNumber: '789',
            firstName: 'Juan',
            lastName: 'Gomez',
            email: 'a@a.com',
            birthDate: new Date('1979-03-26'),
            nationality: 'Argentina',
            celPhone: '01144444444',
            address: 'yatay 240'
        }
        const {
            dataValues: { id },
        } = await Plumber.create(plumber)
        try {
            const { status, data } = await axios.post(
                'http://localhost:2999/plumbers',
                plumber,
            )
        } catch (error) {
            assert.equal(error.response.status, 409)
            await Building.destroy({ where: { id } })
        }
    })

})
