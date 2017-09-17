import noop from 'lodash.noop'

export const Kick = ({ audioContext }) => {
	const output = audioContext.createGain()
	const gains = [
		audioContext.createGain(),
		audioContext.createGain(),
	]
	gains.forEach((gain) => {
		gain.connect(output)
	})
	let oscs = []

	return {
		noteOn(freq = 100, time = audioContext.currentTime, duration = 0.25) {
			oscs.forEach((osc, i) => {
				osc.stop(time)
				osc.disconnect()
				osc.frequency.cancelScheduledValues(time)
				gains[i].gain.cancelScheduledValues(time)
			})
			oscs = [
				audioContext.createOscillator(),
				audioContext.createOscillator(),
			]
			oscs[0].type = 'square'
			oscs[1].type = 'sine'
			oscs.forEach((osc, i) => {
				osc.frequency.setValueAtTime(freq, time)
				osc.frequency.setValueAtTime(freq, time)
				osc.frequency.exponentialRampToValueAtTime(0.001, time + duration)
				osc.frequency.exponentialRampToValueAtTime(0.001, time + duration)
				osc.connect(gains[i])
				osc.start(time)
				osc.stop(time + duration)
			})
			gains.forEach((gain) => {
				gain.gain.setValueAtTime(0.5, time)
				gain.gain.exponentialRampToValueAtTime(0.001, time + duration)
			})
		},
		noteOff: noop,
		connect({ connect, input }) {
			output.connect(input)
			return { connect }
		},
	}
}
