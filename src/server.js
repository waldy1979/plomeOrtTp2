require('dotenv').config()
const express = require('express')
const app = express()

app.set('port', process.env.PORT || 2999)

app.get('/', (req, res) => {
	res.send('Hola Mundo!!!')
})

app.use('/buildings', require('./routes/buildings.routes'))

module.exports = app
