const express = require('express')
const router = express.Router()
const {
	getBuildings,
	getBuilding,
	postBuilding,
	putBuilding,
	deleteBuilding,
} = require('../controllers/buildings.controller')

// router.route('/').get(getBuildings).post(postBuilding)

// router.route('/:id').get(getBuilding).put(putBuilding).delete(deleteBuilding)

router.get('/', getBuildings)

router.get('/:id', getBuilding)

router.post('/', postBuilding)

router.put('/:id', putBuilding)

router.delete('/:id', deleteBuilding)

module.exports = router
