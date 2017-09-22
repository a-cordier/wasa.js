import { Subject } from 'rxjs'

export const Events = Object.freeze({
	SEQUENCER_START: 0,
	SEQUENCER_STOP: 1,
	TEMPO_CHANGE: 2,
	CHANGE: 999,
})

export const Dispatcher = (() => {
	const subject = new Subject()
	return {
		dispatch(type, data) {
			subject.next({ type, data })
		},
		subscribe(type, op) {
			subject
				.filter(action => action.type === type)
				.subscribe(({ data }) => {
					op(data)
				})
			return this
		},
	}
})()
