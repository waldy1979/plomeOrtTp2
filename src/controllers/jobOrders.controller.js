const { JobOrder } = require('../db/models')

exports.listJobOrders = async (req, res) => {
	try {
		const jobOrders = await JobOrder.findAll({
			where: req.query,
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
		const jobOrder = await JobOrder.findByPk(req.params.id)
		if (jobOrder) res.status(200).json({ jobOrder })
		else res.status(404).send('No encontrada')
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}

exports.addJobOrder = async (req, res) => {
	try {
		console.log(req)
		const { dataValues: jobOrder } = await JobOrder.create(req.body)
		res.status(201).json({ jobOrder })
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}

exports.updateJobOrder = async (req, res) => {
	try {
		const { id } = req.params
		await JobOrder.update(req.body, { where: { id } })
		res.status(204).send('OK')
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
