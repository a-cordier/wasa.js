import noop from 'lodash.noop'

export const Sequencer = ({ audioContext }) => {
	let division = 120
	let stop = true
	let stTime = null // start time
	let ntTime = stTime // next tick time
	let tick = 0
	let onPlay = noop
	let onStop = noop
	let onStart = noop
	let tempo = 120

	const schedule = (op) => {
		if (stop) {
			return
		}
		const currentTime = audioContext.currentTime - stTime
		if (currentTime >= ntTime) {
			op(stTime, tick, tempo, division)
			ntTime = currentTime + (60 / (tempo * division))
			tick += 1
		}
	}

	const play = () => {
		schedule(onPlay)
		process.nextTick(play)
	}

	return {
		start() {
			onStart()
			stTime = audioContext.currentTime
			stop = false
			play()
			return this
		},
		stop() {
			stop = true
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
