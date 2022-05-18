const express = require('express')
const app = express()
const { Building } = require('./src/db/models')

app.get('/', (req, res) => {
	res.send('Hello world')
})

app.get('/buildings', async (req, res) => {
	const data = await Building.findAll()
	res.send(data)
})

app.get('/buildings/:id', async (req, res) => {
	const data = await Building.findByPk(req.params.id)
	res.send(data)
})

app.listen(2999)
