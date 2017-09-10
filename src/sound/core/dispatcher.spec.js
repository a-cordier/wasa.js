import test from 'ava'
import { Dispatcher, Events } from './dispatcher'

test((t) => {
	Dispatcher.subscribe(Events.CHANGE, (data) => {
		t.deepEqual(data, { value: 1 })
	})
	Dispatcher.dispatch({
		type: Events.CHANGE,
		data: { value: 1 },
	})
})
