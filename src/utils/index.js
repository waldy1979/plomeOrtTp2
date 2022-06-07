const { Administration } = require('../db/models')

exports.stringIsNotBlankAndNotLongerThan = (string, length) => {
	return string?.trim().length > 0 && string?.length <= length
}

exports.adminIdExists = id => {
	Administration.count({ where: id }).then(count => (count > 0 ? true : false))
}
