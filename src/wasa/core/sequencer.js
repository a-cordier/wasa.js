import noop from 'lodash.noop'
import WorkerTimer from 'worker-timer'

export const Sequencer = ({ audioContext }) => {
	let division = 96 // ticks per quarter note
	let stop = true
	let startTime = 0 // start time
	let tickTime = 0 // next tick time
	let tick = 0
	let onTick = noop
	let onStop = noop
	let onStart = noop
	let tempo = 50

	const schedule = (op) => {
		const currentTime = audioContext.currentTime - startTime
		if (!stop && currentTime >= tickTime) {
			op(tick, tempo, division)
			tickTime = currentTime + (60 / (tempo * division))
			tick += 1
		}
	}

	const play = () => {
		schedule(onTick)
		WorkerTimer.setTimeout(play, 0)
	}

	return {
		start() {
			onStart()
			startTime = audioContext.currentTime
			stop = false
			play()
			return this
		},
		stop() {
			stop = true
			tickTime = 0
			tick = 0
			onStop()
			return this
		},
		isStarted() {
			return !stop
		},
		setDivision(value) {
			division = value
			return this
		},
		getDivision() {
			return division
		},
		setTempo(value) {
			tempo = value
			return this
		},
		getTempo() {
			return tempo
		},
		onStart(op) {
			onStart = op
			return this
		},
		onStop(op) {
			onStop = op
			return this
		},
		onTick(op) {
			onTick = op
			return this
		},
	}
}
