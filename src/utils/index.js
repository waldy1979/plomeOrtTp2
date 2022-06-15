const axios = require('axios')

exports.axiosClient = axios.create({
	baseURL: `http://${process.env.HOST}:${process.env.PORT}`,
})

exports.stringIsNotBlankAndNotLongerThan = (string, length) => {
	return string?.trim().length > 0 && string?.length <= length
}
