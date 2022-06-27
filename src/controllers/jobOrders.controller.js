const { JobOrder, Plumber, Building } = require('../db/models')
const { stringIsNotBlankAndNotLongerThan } = require('../utils')

exports.listJobOrders = async (req, res) => {
	try {
		const jobOrders = await JobOrder.findAll({
			where: req.query,
			include: ['Building', 'Plumber'],
			limit: 100,
		})
		res.status(200).json({ jobOrders })
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}

exports.getJobOrder = async (req, res) => {
	try {
		const jobOrder = await JobOrder.findByPk(req.params.id, {
			include: ['Building', 'Plumber'],
		})
		if (jobOrder) res.status(200).json({ jobOrder })
		else res.status(404).send('No encontrada')
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}

exports.addJobOrder = async (req, res) => {
	console.log(req.body)
	try {
		if (await validateJobOrderParams(req.body)) {
			const { BuildingId, PlumberId, startingDate, endDate, visitTime, payment, aptNumber, place } = req.body
			if (await this.jobOrderIsUnique(BuildingId, startingDate, aptNumber)) {
				const { dataValues: jobOrder } = await JobOrder.create(req.body)
				res.status(201).json({ jobOrder })
			} else {
				res.status(409).send('La orden de trabajo ya existe')
			}
		} else {
			res.status(422).send('Datos invalidos')
		}
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}

exports.updateJobOrder = async (req, res) => {
	try {
		const { id } = req.params
		const jobOrder = await JobOrder.findByPk(id)
		if (jobOrder) {
			await jobOrder.update(req.body)
			res.status(204).json({ jobOrder })
		} else {
			res.status(404).send('No encontrado')
		}
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}
exports.removeJobOrder = async (req, res) => {
	try {
		const { id } = req.params
		const jobOrder = await JobOrder.findByPk(req.params.id)
		if (jobOrder) {
			await JobOrder.destroy({ where: { id } })
			res.status(204).send('OK')
		} else res.status(404).send('No encontrado')
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}

exports.jobOrderIsUnique = async (BuildingId, startingDate, aptNumber) => {
	return (await JobOrder.count({ where: { BuildingId, startingDate, aptNumber } })) == 0
}


async function validateJobOrderParams(jobOrder) {
	const { BuildingId, PlumberId, startingDate, endDate, visitTime, payment, aptNumber, place } = jobOrder || null
	return (
		BuildingId != null &&
		PlumberId != null &&
		startingDate != null &&
		endDate != null &&
		visitTime != null &&
		payment > 0 &&
		!Number.isNaN(aptNumber) &&
		stringIsNotBlankAndNotLongerThan(place, 50) /* &&
		(await buildingIdExists(buildingId)) &&
		(await plumberIdExists(plumberId))*/
	)
}

async function buildingIdExists(id) {
	return (await Building.count({ where: id })) > 0
}

async function plumberIdExists(id) {
	return (await Plumber.count({ where: id })) > 0
}