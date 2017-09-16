import noop from 'lodash.noop'

export const Kick = ({ audioContext }) => {
	const channelMerger = audioContext.createChannelMerger(2)
	const gain1 = audioContext.createGain()
	const gain2 = audioContext.createGain()
	gain1.connect(channelMerger, 0, 0)
	gain2.connect(channelMerger, 0, 1)

	let osc1 = {
		stop: noop,
		disconnect: noop,
	}

	let osc2 = {
		stop: noop,
		disconnect: noop,
	}

	return {
		noteOn(freq = 100, time = audioContext.currentTime, duration = 0.25) {
			osc1.stop(time)
			osc2.stop(time)
			osc1.disconnect()
			osc2.disconnect()
			osc1 = audioContext.createOscillator()
			osc2 = audioContext.createOscillator()
			osc1.type = 'square'
			osc2.type = 'sine'
			gain1.gain.setValueAtTime(0.5, time)
			gain2.gain.setValueAtTime(0.5, time)
			osc1.frequency.setValueAtTime(freq, time)
			osc2.frequency.setValueAtTime(freq, time)
			osc1.frequency.exponentialRampToValueAtTime(0.001, time + duration)
			osc2.frequency.exponentialRampToValueAtTime(0.001, time + duration)
			gain1.gain.exponentialRampToValueAtTime(0.001, time + duration)
			gain2.gain.exponentialRampToValueAtTime(0.001, time + duration)
			osc1.connect(gain1)
			osc2.connect(gain2)
			osc1.start(time)
			osc2.start(time)
			osc1.stop(time + 0.71)
			osc2.stop(time + 0.71)
		},
		noteOff: noop,
		connect({ connect, input }) {
			channelMerger.connect(input)
			return { connect }
		},
	}
}
