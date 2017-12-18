import { DryWetMixer, Snare } from 'wasa'

export default (audioContext) => {
	const sfxDryWetMixerOne = DryWetMixer(audioContext).setFadeValue(-1)
	const sfxDryWetMixerTwo = DryWetMixer(audioContext).setFadeValue(-1)
	const snare = Snare(audioContext)
		.setFrequencyValue(100)
		.setNoiseFilterValue(4000)
		.setOscMixValue(-0.2)
		.setDurationValue(0.5)
		.setOutputGainValue(1)


	snare
		.connect(sfxDryWetMixerOne)
		.connect(sfxDryWetMixerTwo)
		.connect({ getInput: () => audioContext.destination })

	return Object.assign(snare, {
		sfxDryWetMixerOne,
		sfxDryWetMixerTwo,
	})
}
