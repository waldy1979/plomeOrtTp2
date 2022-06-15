const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { adminIdExists } = require('../controllers/administrations.controller')
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
	body('address').isString().isLength({ min: 1, max: 50 }),
	body('city').isString().isLength({ min: 1, max: 40 }),
	body('manager').isString().isLength({ min: 1, max: 40 }),
	body('cellPhone').isString().isLength({ min: 1, max: 40 }),
	body('AdministrationId')
		.custom(async id => {
			if (!(await adminIdExists(id))) return Promise.reject()
		})
		.withMessage('Administration does not exist'),
	checkValidationResult,
	addBuilding,
)

router.put(
	'/:id',
	body('address').isString().isLength({ min: 1, max: 50 }),
	body('city').isString().isLength({ min: 1, max: 40 }),
	body('manager').isString().isLength({ min: 1, max: 40 }),
	body('cellPhone').isString().isLength({ min: 1, max: 40 }),
	body('AdministrationId')
		.custom(async id => {
			if (!(await adminIdExists(id))) return Promise.reject()
		})
		.withMessage('Administration does not exist'),
	checkValidationResult,
	updateBuilding,
)

router.delete('/:id', removeBuilding)

module.exports = router
