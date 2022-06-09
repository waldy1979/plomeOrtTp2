exports.stringIsNotBlankAndNotLongerThan = (string, length) => {
	return string?.trim().length > 0 && string?.length <= length
}
