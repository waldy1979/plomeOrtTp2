const express = require('express')
const router = express.Router()
const {
	listAdministrations,
	getAdministration,
	addAdministration,
	updateAdministration,
	removeAdministration,
} = require('../controllers/administrations.controller')
router.get('/', listAdministrations)

router.get('/:id', getAdministration)

router.post('/', addAdministration)

router.put('/:id', updateAdministration)

router.delete('/:id', removeAdministration)

module.exports = router
