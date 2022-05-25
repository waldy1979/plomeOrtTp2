require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

app.set('port', process.env.PORT || 2999)

app.use(cors())
app.use(express.json({ extended: true }))

app.get('/', (req, res) => {
	res.send('Hola Mundo!!!')
})

app.use('/buildings', require('./routes/buildings.routes'))

app.listen(app.get('port'), () => {
	console.log(`Server on port ${app.get('port')}!`)
})
