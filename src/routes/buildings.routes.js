const express = require('express')
const router = express.Router()
const { check, body } = require('express-validator')
const {
	listBuildings,
	getBuilding,
	addBuilding,
	updateBuilding,
	removeBuilding,
} = require('../controllers/buildings.controller')
const {
	checkValidationResult,
} = require('../middlewares/checkValidationResult')

router.get('/', listBuildings)

router.get('/:id', getBuilding)

router.post(
	'/',
	body('address').isLength({ min: 1, max: 50 }),
	body('city').isLength({ min: 1, max: 40 }),
	body('manager').isLength({ min: 1, max: 40 }),
	body('cellPhone').isLength({ min: 1, max: 40 }),
	checkValidationResult,
	addBuilding,
)

router.put(
	'/:id',
	body('address').isString().isLength({ min: 1, max: 50 }),
	body('city').isString().isLength({ min: 1, max: 40 }),
	body('manager').isString().isLength({ min: 1, max: 40 }),
	body('cellPhone').isString().isLength({ min: 1, max: 40 }),
	checkValidationResult,
	updateBuilding,
)

router.delete('/:id', removeBuilding)

module.exports = router
