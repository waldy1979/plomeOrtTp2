const { validationResult } = require('express-validator')

exports.checkValidationResult = async (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(422).json({ msg: 'Invalid data', errors: errors.array() })
	}
	next()
}
