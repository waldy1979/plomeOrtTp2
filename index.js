const app = require('./src/server')

app.listen(app.get('port'), () => {
	console.log(`Server on port ${app.get('port')}!`)
})
