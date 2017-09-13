import noop from 'lodash.noop'

export const Sequencer = ({ audioContext }) => {
	let division = 120 // ticks per quarter note
	let stop = true
	let startTime = 0 // start time
	let tickTime = 0 // next tick time
	let tick = 0
	let onPlay = noop
	let onStop = noop
	let onStart = noop
	let tempo = 120

	const schedule = (op) => {
		const currentTime = audioContext.currentTime - startTime
		if (!stop && currentTime >= tickTime) {
			op(tick, tempo, division)
			tickTime = currentTime + (60 / (tempo * division))
			tick += 1
		}
	}

	const play = () => {
		schedule(onPlay)
		requestAnimationFrame(play)
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
		onPlay(op) {
			onPlay = op
			return this
		},
	}
}
