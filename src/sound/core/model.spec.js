import test from 'ava'
import { ValueModel, Dispatcher, Events } from '.'

test('ValueModel dispatchers and Event on value changes', (t) => {
	const valueModel = ValueModel({})
	Dispatcher.subscribe(Events.CHANGE, (data) => {
		t.is(1, data)
	})
	valueModel.setValue(1)
})
