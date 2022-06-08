const { Plumber } = require('../db/models')

exports.listPlumbers = async (req, res) => {
    try {
        const plumbers = await Plumber.findAll({
            where: req.query,
            limit: 100,
            /* include: 'Plumber', */
        })
        res.status(200).json({ plumbers })
    } catch (error) {
        console.error(error)
        res.status(500).send('Hubo un error')
    }
}

exports.getPlumber = async (req, res) => {
    try {
        const plumber = await Plumber.findByPk(req.params.id)
        if (plumber) res.status(200).json({ plumber })
        else res.status(404).send('No encontrado')
    } catch (error) {
        console.error(error)
        res.status(500).send('Hubo un error')
    }
}

exports.addPlumber = async (req, res) => {
    try {
        const { dataValues: plumber } = await Plumber.create(req.body)
        res.status(201).json({ plumber })
    } catch (error) {
        console.error(error)
        res.status(500).send('Hubo un error')
    }
}

exports.updatePlumber = async (req, res) => {
    try {
        const { id } = req.params
        await Plumber.update(req.body, { where: { id } })
        res.status(204).send('OK')
    } catch (error) {
        console.error(error)
        res.status(500).send('Hubo un error')
    }
}

exports.removePlumber = async (req, res) => {
    try {
        const { id } = req.params
        const plumber = await Plumber.findByPk(req.params.id)
        if (plumber) {
            await Plumber.destroy({ where: { id } })
            res.status(204).send('OK')
        } else res.status(404).send('No encontrado')
    } catch (error) {
        console.error(error)
        res.status(500).send('Hubo un error')
    }
}
