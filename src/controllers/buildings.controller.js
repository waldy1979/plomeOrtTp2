const { Building } = require('../db/models')

exports.listBuildings = async (req, res) => {
	try {
		const buildings = await Building.findAll({
			where: req.query,
			limit: 100,
			include: 'Administration',
		})
		res.status(200).json({ buildings })
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}

exports.getBuilding = async (req, res) => {
	try {
		const building = await Building.findByPk(req.params.id)
		if (building) res.status(200).json({ building })
		else res.status(404).send('No encontrado')
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}

exports.addBuilding = async (req, res) => {
	try {
		const { dataValues: building } = await Building.create(req.body)
		res.status(201).json({ building })
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}

exports.updateBuilding = async (req, res) => {
	try {
		const { id } = req.params
		await Building.update(req.body, { where: { id } })
		res.status(204).send('OK')
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}

exports.removeBuilding = async (req, res) => {
	try {
		const { id } = req.params
		const building = await Building.findByPk(req.params.id)
		if (building) {
			await Building.destroy({ where: { id } })
			res.status(204).send('OK')
		} else res.status(404).send('No encontrado')
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}
