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
	body(
		'address',
		'La dirección es requerida y debe tener un máximo de 50 caracteres.',
	)
		.isString()
		.notEmpty()
		.isLength({ max: 50 }),
	body(
		'city',
		'La ciudad es requerida y debe tener un máximo de 40 caracteres.',
	)
		.isString()
		.notEmpty()
		.isLength({ max: 40 }),
	body(
		'manager',
		'El encargado es requerido y debe tener un máximo de 40 caracteres.',
	)
		.isString()
		.notEmpty()
		.isLength({ max: 40 }),
	body(
		'cellPhone',
		'El celular del encargado es requerido y debe tener un máximo de 40 caracteres.',
	)
		.isString()
		.notEmpty()
		.isLength({ max: 40 }),
	body('AdministrationId', 'Adminstración inexistente').custom(async id => {
		if (!(await adminIdExists(id))) return Promise.reject()
	}),
	checkValidationResult,
	addBuilding,
)

router.put(
	'/:id',
	body('address', 'La dirección debe ser un string entre 1 y 50 caracteres.')
		.isString()
		.isLength({ min: 1, max: 50 }),
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
