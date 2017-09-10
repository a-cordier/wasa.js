import noop from 'lodash.noop'

export const Sequencer = ({ audioContext }) => {
	let division = 120
	let length = 8
	let stop = true
	let loop = false
	let stTime = null // start time
	let ntTime = stTime // next tick time
	let currentTick = 0
	let onPlay = noop
	let onStop = noop
	let onStart = noop
	let onLoop = noop
	let tempo = 120

	const tick = (currentTime) => {
		ntTime = currentTime + (60 / (tempo * (division)))
		currentTick += 1
		if (loop) {
			currentTick %= (length * division)
			if (0 === currentTick) {
				onLoop()
			}
		}
	}

	const schedule = (op) => {
		if (null === stTime) {
			stTime = audioContext.currentTime
		}
		const currentTime = audioContext.currentTime - stTime
		if (currentTime >= ntTime) {
			if (!stop) {
				op(stTime, currentTick, tempo, division)
			}
			tick(currentTime)
		}
	}

	const play = () => {
		schedule(onPlay)
		requestAnimationFrame(play)
	}

	return {
		start() {
			onStart()
			stop = false
			play()
		},
		stop() {
			stop = true
			onStop()
		},
		isStarted() {
			return !stop
		},
		loop() {
			loop = true
			return this
		},
		setDivision(value) {
			division = value
			return this
		},
		getDivision() {
			return division
		},
		setLength(value) {
			length = value
			return this
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
		onLoop(op) {
			onLoop = op
			return this
		},
	}
}
