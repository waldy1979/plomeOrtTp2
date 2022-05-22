const express = require('express')
const app = express()
const { Plumber } = require('./src/db/models')  /* va por defecto a buscar al index de models y tare el objeto db y por destructuracion, solo me quedo con el objeto Plumbers*/

app.get('/', function (req, res) {
    res.send('Hello')
})

app.get('/plumbers', async function (req, res) {
    let data = await Plumber.findAll()
    res.send(data)
})

app.get('/plumbers/:id', async function (req, res) {
    let data = await Plumber.findByPk(req.params.id)
    res.send(data)
})


app.listen(3000)
