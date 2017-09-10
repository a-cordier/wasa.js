import isNil from 'lodash.isnil'

export const scale = (range, value) => {
	if (isNil(range)) {
		return value
	}
	return ((range.max - range.min) * value) + range.min
}

export const unscale = (range, value) => {
	if (isNil(range)) {
		return value
	}
	return (value - range.min) / (range.max - range.min)
}
