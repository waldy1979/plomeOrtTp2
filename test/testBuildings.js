const axios = require('axios')
const { assert } = require('chai')

describe('Building ', function () {
	beforeEach(async () => {
		const building = {
			address: 'Test',
			city: 'Test',
			manager: 'Test',
			cellPhone: 'Test',
		}
		const resp = await axios.post(`buildings/`, building)
		console.log(resp)
	})

	it('Que no permita cargar un edificio duplicado', function () {
		// let estadoPresupuestoViejo = trabajo.getPresupuesto().getEstado()
		// presupuesto.setFechaEmision('2022-04-19') // tiene menos de 5 dias de emitido
		// assert.doesNotThrow(() => aprobarPresupuesto.aprobar(trabajo))
		// assert.notEqual(
		// 	estadoPresupuestoViejo,
		// 	trabajo.getPresupuesto().getEstado(),
	})

	it('Si no pasaron 4 meses lanza una excepcion', function () {})

	it('Lanza un excepcion si ya se recategorizo en este periodo', function () {})
})
