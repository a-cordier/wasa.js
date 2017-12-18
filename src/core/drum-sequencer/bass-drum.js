import { DryWetMixer, Kick } from 'wasa'

export default (audioContext) => {
	const sfxDryWetMixerOne = DryWetMixer(audioContext).setFadeValue(-1)
	const sfxDryWetMixerTwo = DryWetMixer(audioContext).setFadeValue(-1)
	const bassDrum = Kick(audioContext)
		.setDurationValue(0.15)
		.setFrequencyValue(150)
		.setOutputGainValue(1)

	bassDrum
		.connect(sfxDryWetMixerOne)
		.connect(sfxDryWetMixerTwo)
		.connect({ getInput: () => audioContext.destination })

	return Object.assign(bassDrum, {
		sfxDryWetMixerOne,
		sfxDryWetMixerTwo,
	})
}
