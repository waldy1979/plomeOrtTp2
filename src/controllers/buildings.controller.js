const { Building, Administration } = require('../db/models')
const { stringIsNotBlankAndNotLongerThan } = require('../utils')
const { adminIdExists } = require('./administrations.controller')

exports.listBuildings = async (req, res) => {
	try {
		const buildings = await Building.findAll({
			where: req.query,
			limit: 100,
			// include: 'Administration',
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
		const { address, city } = req.body
		if (await this.buildingIsUnique(address, city)) {
			const { dataValues: building } = await Building.create(req.body)
			res.status(201).json({ building })
		} else {
			res.status(409).send('El edificio ya existe')
		}
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}

exports.updateBuilding = async (req, res) => {
	try {
		const { id } = req.params
		const building = await Building.findByPk(id)
		if (building) {
			await building.update(req.body)
			res.status(204).json({ building })
		} else {
			res.status(404).send('No encontrado')
		}
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}

exports.removeBuilding = async (req, res) => {
	try {
		const { id } = req.params
		const building = await Building.findByPk(id)
		if (building) {
			await building.destroy({ where: { id } })
			res.status(204).send('OK')
		} else {
			res.status(404).send('No encontrado')
		}
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}

exports.buildingIsUnique = async (address, city) => {
	return (await Building.count({ where: { address, city } })) == 0
}

async function validateBuildingParams(building) {
	const { address, city, manager, cellPhone, AdministrationId } =
		building || null
	return (
		stringIsNotBlankAndNotLongerThan(address, 50) &&
		stringIsNotBlankAndNotLongerThan(city, 40) &&
		stringIsNotBlankAndNotLongerThan(manager, 40) &&
		stringIsNotBlankAndNotLongerThan(cellPhone, 40) &&
		(await adminIdExists(AdministrationId))
	)
}
