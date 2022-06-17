const axios = require('axios')
const { assert } = require('chai')
const { JobOrder } = require('../src/db/models')
const { jobOrderIsUnique } = require('../src/controllers/jobOrders.controller')
const { axiosClient } = require('../src/utils')

describe('jobOrder is Unique', () => {
    let jobOrder

    beforeEach(async () => {
        jobOrder = await JobOrder.create({
            buildingId: 1,
            plumberId: 1,
            startingDate: new Date('2011-1-1'),
            endDate: new Date(),
            state: 'en curso',
            isPayed: false,
            visitDate: new Date(),
            visitTime: '16:20',
            aptNumber: 42,
            place: 'CABA',
            payment: 1001,
        })
    })

    afterEach(async () => {
        await jobOrder.destroy()
    })

    it('Debe devolver FALSE si le paso el que ya existe', async () => {
        assert.equal(await jobOrderIsUnique(1, new Date('2011-1-1'), 42), false)
    })

    it('Debe devolver TRUE si le paso uno que no hay', async () => {
        assert.equal(await jobOrderIsUnique(1, new Date('2011-1-1'), 43), true)
    })
})

describe('JobOrder Create', () => {


    it('Si no existe el building no debe permitir la carga ', async () => {
        const jobOrder = {
            buildingId: -2,
            plumberId: 1,
            startingDate: new Date('2011-1-1'),
            endDate: new Date(),
            state: 'en curso',
            isPayed: false,
            visitDate: new Date(),
            visitTime: '16:20',
            aptNumber: 42,
            place: 'CABA',
            payment: 1001,
        }

        try {
            const {
                status,
                data: {
                    jobOrder: { id },
                },
            } = await axiosClient.post('/jobOrders', jobOrder)
            assert.equal(status, 201)
            await JobOrder.destroy({ where: { id } })
        } catch (error) {
            assert.equal(error.response.status, 422)
        }
    })

    it('Si no existe el plumber no debe permitir la carga ', async () => {
        const jobOrder = {
            buildingId: 2,
            plumberId: -1,
            startingDate: new Date('2011-1-1'),
            endDate: new Date(),
            state: 'en curso',
            isPayed: false,
            visitDate: new Date(),
            visitTime: '16:20',
            aptNumber: 42,
            place: 'CABA',
            payment: 1001,
        }

        try {
            const {
                status,
                data: {
                    jobOrder: { id },
                },
            } = await axiosClient.post('/jobOrders', jobOrder)
            assert.equal(status, 201)
            await JobOrder.destroy({ where: { id } })
        } catch (error) {
            assert.equal(error.response.status, 422)
        }
    })

    it('Si no aptNumber no es un numero no debe permitir la carga ', async () => {
        const jobOrder = {
            buildingId: 2,
            plumberId: 2,
            startingDate: new Date('2011-1-1'),
            endDate: new Date(),
            state: 'en curso',
            isPayed: false,
            visitDate: new Date(),
            visitTime: '16:20',
            aptNumber: 'asd',
            place: 'CABA',
            payment: 1001,
        }

        try {
            const {
                status,
                data: {
                    jobOrder: { id },
                },
            } = await axiosClient.post('/jobOrders', jobOrder)
            assert.equal(status, 201)
            await JobOrder.destroy({ where: { id } })
        } catch (error) {
            assert.equal(error.response.status, 500)
        }
    })

    it('Si place esta en blanco no debe permitir la carga ', async () => {
        const jobOrder = {
            buildingId: 2,
            plumberId: -1,
            startingDate: new Date('2011-1-1'),
            endDate: new Date(),
            state: 'en curso',
            isPayed: false,
            visitDate: new Date(),
            visitTime: '16:20',
            aptNumber: 42,
            place: '',
            payment: 1001,
        }

        try {
            const {
                status,
                data: {
                    jobOrder: { id },
                },
            } = await axiosClient.post('/jobOrders', jobOrder)
            assert.equal(status, 201)
            await JobOrder.destroy({ where: { id } })
        } catch (error) {
            assert.equal(error.response.status, 422)
        }
    })

})