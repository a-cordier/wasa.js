import { DryWetMixer, Snare } from 'wasa'

export default (audioContext) => {
	const sfxDryWetMixerOne = DryWetMixer(audioContext).setFadeValue(-1)
	const sfxDryWetMixerTwo = DryWetMixer(audioContext).setFadeValue(-1)
	const snare = Snare(audioContext)
		.setFrequencyValue(450)
		.setNoiseFilterValue(10)
		.setOscMixValue(-0.4)
		.setDurationValue(1)
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
