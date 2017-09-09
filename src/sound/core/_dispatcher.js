import { Subject } from 'rxjs'

export const Events = Object.freeze({
	CHANGE: 0,
})

export const Dispatcher = (() => {
	const subject = new Subject()
	return {
		dispatch({ type, data }) {
			subject.next({ type, data })
		},
		subscribe({ type, data }, op) {
			subject
				.filter(action => action.type === type)
				.subscribe((action) => {
					op(action.data)
				})
		},
	}
})()
