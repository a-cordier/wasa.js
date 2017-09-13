import test from 'ava'
import sinon from 'sinon'
import { Sequencer } from '.'
import { AudioContextMock } from '../mock/audio-context.mock'

test('Calling start trigger onPlay handler', (t) => {
	const audioContext = AudioContextMock(sinon.sandbox.create())
	Sequencer({ audioContext })
		.onPlay(() => {
			t.pass()
		})
		.start()
})
