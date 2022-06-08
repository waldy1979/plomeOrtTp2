const { Administration } = require('../db/models')

exports.stringIsNotBlankAndNotLongerThan = (string, length) => {
	return string?.trim().length > 0 && string?.length <= length
}

exports.adminIdExists = async id => {
	const count = await Administration.count({ where: id })
	return count > 0 ? true : false
}
