const express = require('express')
const router = express.Router()
const {
	listJobOrder,
	getJobOrder,
	addJobOrder,
	updateJobOrder,
	removeJobOrder,
} = require('../controllers/jobOrders.controller')
router.get('/', listJobOrders)

router.get('/:id', getJobOrder)

router.post('/', addJobOrder)

router.put('/:id', updateJobOrder)

router.delete('/:id', removeJobOrder)

module.exports = router
