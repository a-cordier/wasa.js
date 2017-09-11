export const AudioContextMock = (sandbox) => {
	const oscillators = []
	const gains = []

	const AudioParam = () => ({
		setValueAtTime: sandbox.spy(),
		cancelScheduledValues: sandbox.spy(),
		linearRampToValueAtTime: sandbox.spy(),
		value: undefined,
	})

	const createGain = () => ({
		gain: AudioParam(),
		connect: sandbox.spy(),
	})


	const createOscillator = () => ({
		frequency: AudioParam(),
		connect: sandbox.spy(),
		start: sandbox.spy(),
	})

	const createChannelMerger = () => ({
		connect: sandbox.spy(),
	})

	const createBiquadFilter = () => ({
		frequency: AudioParam(),
		gain: AudioParam(),
		Q: AudioParam(),
		connect: sandbox.spy(),
	})

	const AudioContextMethods = {
		createOscillator() {
			const osc = createOscillator()
			oscillators.push(osc)
			return osc
		},
		createGain() {
			const gain = createGain()
			gains.push(gain)
			return gain
		},
		createBiquadFilter() {
			return createBiquadFilter()
		},
		createChannelMerger() {
			return createChannelMerger()
		},
	}

	return Object.assign({},
		AudioContextMethods.reduce((a, c) =>
			Object.assign(a,
				{ c: sandbox.spy(AudioContextMethods, AudioContextMethods[c]) },
				{}),
			{
				getOscillatorNodes() {
					return oscillators
				},
				getGainNodes() {
					return gains
				},
			}))
}

export const AudioContext = sandbox => AudioContextMock(sandbox)
