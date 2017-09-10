import constant from 'lodash.constant'
import { Dispatcher, Events, scale, unscale } from '.'

export const ValueModel = ({ init = constant(0), range }) => {
	let value = init()
	return {
		setValue(v) {
			value = scale(range, v)
			Dispatcher.dispatch({
				type: Events.CHANGE,
				data: v,
			})
		},
		getValue() {
			return unscale(range, value)
		},
	}
}

export const AudioModel = ({ range, param, init = constant(param.value) }) => {
	const p = param
	p.value = init()
	return {
		setValue(v) {
			p.value = scale(range, v)
			Dispatcher.dispatch({
				type: Events.CHANGE,
				data: v,
			})
		},
		getValue() {
			return unscale(range, p.value)
		},
	}
}

