import test from 'ava'
import sinon from 'sinon'
import { Sequencer } from '.'
import { AudioContextMock } from '../../test/mock/audio-context.mock'

test('Calling start trigger onPlay handler', (t) => {
	t.pass()
	const audioContext = AudioContextMock(sinon.sandbox.create())
	Sequencer({ audioContext })
		.onPlay(() => {
			t.pass()
		})
		.start()
})
