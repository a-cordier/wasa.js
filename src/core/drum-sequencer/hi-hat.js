import { DryWetMixer, Hat } from 'wasa'

export default (audioContext) => {
	const sfxDryWetMixerOne = DryWetMixer(audioContext).setFadeValue(-1)
	const sfxDryWetMixerTwo = DryWetMixer(audioContext).setFadeValue(-1)

	const hiHat = Hat(audioContext)
		.setDurationValue(0.75)

	hiHat
		.connect(sfxDryWetMixerOne)
		.connect(sfxDryWetMixerTwo)
		.connect({ getInput: () => audioContext.destination })

	return Object.assign(hiHat, {
		sfxDryWetMixerOne,
		sfxDryWetMixerTwo,
	})
}
