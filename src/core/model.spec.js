import test from 'ava'
import sinon from 'sinon'
import { ValueModel, AudioModel } from '.'
import { Dispatcher, Events } from '../common'
import { AudioContextMock } from '../mock/audio-context.mock'

test('ValueModel dispatches a change event on value changes', (t) => {
	t.plan(1)
	const valueModel = ValueModel({})
	Dispatcher.subscribe(Events.CHANGE, (data) => {
		t.is(1, data)
	})
	valueModel.setValue(1)
})

test('AudioModel dispatches a change event on value changes', (t) => {
	t.plan(1)
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const osc = audioContext.createOscillator()
	const audioModel = AudioModel({ param: osc })
	Dispatcher.subscribe(Events.CHANGE, (data) => {
		t.is(1, data)
	})
	audioModel.setValue(1)
})

test('AudioModel setValue acts on inner param value', (t) => {
	t.plan(1)
	const audioContext = AudioContextMock(sinon.sandbox.create())
	const osc = audioContext.createOscillator()
	const audioModel = AudioModel({ param: osc })
	audioModel.setValue(440)
	t.is(440, osc.value)
})

