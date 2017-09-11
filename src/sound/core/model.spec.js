import test from 'ava'
import { ValueModel, Dispatcher, Events } from '.'

test('ValueModel dispatches a change event on value changes', (t) => {
	t.plan(1)
	const valueModel = ValueModel({})
	Dispatcher.subscribe(Events.CHANGE, (data) => {
		t.is(1, data)
	})
	valueModel.setValue(1)
})
