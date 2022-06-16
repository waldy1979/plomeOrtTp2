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
            startingDate: new Date,
            endDate: new Date,
            state: 'en curso',
            isPayed: false,
            visitDate: new Date,
            visitTime: visitDate.getTime(),
            aptNumber: 42,
            place: 'CABA'

        })
    })

    afterEach(async () => {
        await jobOrder.destroy()
    })

    it('Debe devolver FALSE si le paso el que ya existe', async () => {
        assert.equal(await jobOrderIsUnique(jobOrder.id), false)
    })

    it('Debe devolver TRUE si le paso uno que no hay', async () => {
        assert.equal(await jobOrderIsUnique(jobOrder.id + 999999999), true)
    })
})

describe('JobOrder Create', () => {


    it('Si cumplo con los requisitos de cada campo debe permitir la carga ', async () => {
        const jobOrder = {
            buildingId: 1,
            plumberId: 1,
            startingDate: new Date,
            endDate: new Date,
            state: 'en curso',
            isPayed: false,
            visitDate: new Date,
            visitTime: visitDate.getTime(),
            aptNumber: 42,
            place: 'CABA'
        }

        try {
            const {
                status,
                data: {
                    jobOrder: { id },
                },
            } = await axiosClient.post('/jobOrders', jobOrder)
            assert.equal(status, 201)
            await Plumber.destroy({ where: { id } })
        } catch (error) {
            console.log(error.message)
            assert.equal(error.message, '')
        }
    })


    it('Si aptNumber no es un numero, no debe permitir la carga ', async () => {
        const jobOrder = {
            buildingId: 1,
            plumberId: 1,
            startingDate: new Date,
            endDate: new Date,
            state: 'en curso',
            isPayed: false,
            visitDate: new Date,
            visitTime: visitDate.getTime(),
            aptNumber: 'asd',
            place: 'CABA'
        }
        try {
            await axiosClient.post('/jobOrder', jobOrder)
        } catch (error) {
            assert.equal(error.response.status, 422)
        }
    })

    it('Si place esta en blanco, no debe permitir la carga ', async () => {
        const jobOrder = {
            buildingId: 1,
            plumberId: 1,
            startingDate: new Date,
            endDate: new Date,
            state: 'en curso',
            isPayed: false,
            visitDate: new Date,
            visitTime: visitDate.getTime(),
            aptNumber: 42,
            place: ''
        }
        try {
            await axiosClient.post('/jobOrder', jobOrder)
        } catch (error) {
            assert.equal(error.response.status, 422)
        }
    })

})
