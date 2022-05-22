const express = require('express')
const app = express()
const {Administrator,Administration} = require('./src/db/models')

app.get('/', function (req, res) {
    res.send('hay un server corriendo...')
})

//Administrations 
app.get('/administrations', async function (req, res) {
    let data = await Administration.findAll()
    res.send(data)
})
app.get('/administrations/:id', async function (req, res) {
    let data = await Administration.findByPk(req.params.id)
    res.send(data)
})
app.get('/administrations-create', async function (req, res) {
    await Administration.create({
        name : "Ramon",
        lastName : "Medina Bello",
        email : "un@email.com",
        cellPhone:"15 5700-5670"
    })
    res.send('Created')
})
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
        name : "Ramon",
        lastName : "Medina Bello",
        email : "un@email.com",
        cellPhone:"15 5700-5670"
    })
    res.send('Created')
})
//fin administrators
app.listen(6001)