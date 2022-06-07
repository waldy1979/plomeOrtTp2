const { assert } = require('chai')
const { stringIsNotBlankAndNotLongerThan } = require('../src/utils')

describe('stringIsNotBlankAndNotLongerThan', function () {
	it('Si recibe NULL tiene que devolver FALSE', function () {
		assert.equal(stringIsNotBlankAndNotLongerThan(null, 10), false)
	})

	it("Si recibe '' tiene que devolver FALSE", function () {
		assert.equal(stringIsNotBlankAndNotLongerThan('', 10), false)
	})

	it("Si recibe 'abc' tiene que devolver TRUE", function () {
		assert.equal(stringIsNotBlankAndNotLongerThan('abc', 10), true)
	})

	it('Si recibe 10 caracteres tiene que devolver TRUE', function () {
		assert.equal(stringIsNotBlankAndNotLongerThan('abcde12345', 10), true)
	})

	it('Si recibe 11 caracteres tiene que devolver FALSE', function () {
		assert.equal(stringIsNotBlankAndNotLongerThan('abcde123456', 10), false)
	})
})
