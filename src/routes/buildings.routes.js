const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
	const data = await Building.findAll()
	res.send(data)
})

router.get('/:id', async (req, res) => {
	const data = await Building.findByPk(req.params.id)
	res.send(data)
})

router.post('/', async (req, res) => {})

router.put('/:id', async (req, res) => {})

router.delete('/:id', async (req, res) => {})

module.exports = router
