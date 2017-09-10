import test from 'ava'
import { getFrequency } from '.'

test('Note B3 converts to 246.94 Hz', (t) => {
	const frequency = getFrequency('B', 3)
	t.is(246.94, Number(frequency.toFixed(2)))
})

test('Note A3 converts to 220 Hz', (t) => {
	const frequency = getFrequency('A', 3)
	t.is(220, frequency)
})

test('Note A#3 converts to 233.08 Hz', (t) => {
	const frequency = getFrequency('A#', 3)
	t.is(233.08, Number(frequency.toFixed(2)))
})

test('Note A4 converts to 440 Hz', (t) => {
	const frequency = getFrequency('A', 4)
	t.is(440, frequency)
})

test('Note A5 converts to 880 Hz', (t) => {
	const frequency = getFrequency('A', 5)
	t.is(880, frequency)
})

