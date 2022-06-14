const express = require('express')
const router = express.Router()
const {
	listBuildings,
	getBuilding,
	addBuilding,
	updateBuilding,
	removeBuilding,
} = require('../controllers/buildings.controller')

router.get('/', listBuildings)

router.get('/:id', getBuilding)

router.post('/', addBuilding)

router.put('/:id', updateBuilding)

router.delete('/:id', removeBuilding)

module.exports = router
