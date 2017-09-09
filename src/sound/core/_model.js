import isNil from 'lodash.isnil'
import { Dispatcher, Events, scale, unscale } from '.'

export const ValueModel = ({ init, range }) => {
	let value = 0
	if (!isNil(init)) {
		value = init()
	}
	return {
		setValue(v) {
			value = scale(range, v)
			Dispatcher.dispatch(Events.CHANGE)
		},
		getValue() {
			return unscale(range, value)
		},
	}
}

