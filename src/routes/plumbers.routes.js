const express = require('express')
const router = express.Router()
const {
    listPlumbers,
    getPlumber,
    addPlumber,
    updatePlumber,
    removePlumber,
} = require('../controllers/plumbers.controller')
router.get('/', listPlumbers)

router.get('/:id', getPlumber)

router.post('/', addPlumber)

router.put('/:id', updatePlumber)

router.delete('/:id', removePlumber)

module.exports = router
