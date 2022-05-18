const { Building } = require('../db/models')

// exports.getBuildings = async (req, res) => {
// 	const { id } = req.params
// 	const data = id
// 		? await Building.findByPk(req.params.id)
// 		: await Building.findAll()
// 	res.send(data)
// }

exports.getBuildings = async (req, res) => {
	const data = await Building.findAll()
	res.send(data)
}

exports.getBuilding = async (req, res) => {
	const data = await Building.findByPk(req.params.id)
	res.send(data)
}

exports.postBuilding = async (req, res) => {}

exports.putBuilding = async (req, res) => {}

exports.deleteBuilding = async (req, res) => {}
