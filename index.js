require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { Administrator, Administration, Plumber } = require('./src/db/models')

//INIT
const app = express()

//SETTINGS
app.set('port', process.env.PORT || 2999)

// MIDDLEWARES
app.use(cors())
app.use(express.json({ extended: true }))

app.get('/', function (req, res) {
	res.send('hay un server corriendo...')
})

//Administrations
app.use('/administrations', require('./src/routes/administrations.routes'))
//fin administrations

//Administrators
app.get('/administrators', async function (req, res) {
	let data = await Administrator.findAll()
	res.send(data)
})
app.get('/administrators/:id', async function (req, res) {
	let data = await Administrator.findByPk(req.params.id)
	res.send(data)
})
app.get('/administrators-create', async function (req, res) {
	await Administrator.create({
		name: 'Ramon',
		lastName: 'Medina Bello',
		email: 'un@email.com',
		cellPhone: '15 5700-5670',
	})
	res.send('Created')
})
//fin administrators

// Buildings
app.use('/buildings', require('./src/routes/buildings.routes'))
// Fin Buildings

//Plumbers
/* app.get('/plumbers', async function (req, res) {
	let data = await Plumber.findAll()
	res.send(data)
})

app.get('/plumbers/:id', async function (req, res) {
	let data = await Plumber.findByPk(req.params.id)
	res.send(data)
}) */

app.use('/plumbers', require('./src/routes/plumbers.routes'))
//fin plumbers

// SERVERT STARTER
app.listen(app.get('port'), () => {
	console.log(`Server on port ${app.get('port')}!`)
})
