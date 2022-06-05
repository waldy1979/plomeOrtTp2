const { Administration,Administrator,AdminTelePhone,Address } = require('../db/models')

exports.listAdministrations = async (req, res) => {
	try {
		const administrations = await Administration.findAll({
			where: req.query,			
			include: ['Address','Administrator','AdminTelephones'],
		})
		res.status(200).json({ administrations })
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}

exports.getAdministration = async (req, res) => {
	try {
		const administration = await Administration.findByPk(req.params.id,{include: ['Address','Administrator','AdminTelephones'],})
		if (administration) res.status(200).json({ administration })
		else res.status(404).send('No encontrada')
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}

exports.addAdministration = async (req, res) => {
	try {
		console.log(req)
		const { dataValues: administration } = await Administration.create(req.body)
		res.status(201).json({ administration })
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}

exports.updateAdministration = async (req, res) => {
	try {
		const { id } = req.params
		await Administration.update(req.body, { where: { id } })
		res.status(204).send('OK')
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}

exports.removeAdministration = async (req, res) => {
	try {
		const { id } = req.params
		const administration = await Administration.findByPk(req.params.id)
		if (administration) {
			await Administration.destroy({ where: { id } })
			res.status(204).send('OK')
		} else res.status(404).send('No encontrado')
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}
