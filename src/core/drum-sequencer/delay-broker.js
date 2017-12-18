import { Delay, Dispatcher } from 'wasa'
import { menuEvents } from '../../menus/menu-events'

export default (audioContext) => {
	const delays = []

	Dispatcher.as(menuEvents.SFX_KNOB_TO_DELAY)
		.subscribe((sfxController) => {
			const delay = Delay(audioContext)
			sfxController.setWetNode(delay)
			delays.push(delay)
		})

	return {
		setFrequencyValue(value) {
			delays.forEach(d => d.setFrequencyValue(value))
		},
		getFrequencyValue() {
			return delays.reduce((a, d) => d.getFrequencyValue(), delays)
		},
		setFeedbackValue(value) {
			delays.forEach(d => d.setFeedbackValue(value))
		},
		getFeedbackValue() {
			return delays.reduce((a, d) => d.getFeedbackValue(), delays)
		},
		setDivisionValue(value) {
			delays.forEach(d => d.setDivisionValue(value))
		},
		getDivisionValue() {
			return delays.reduce((a, d) => d.getDivisionValue(), delays)
		},
		setOutputGainValue(value) {
			delays.forEach(d => d.setOutputGainValue(value))
		},
		getOutputGainValue() {
			return delays.reduce((a, d) => d.getOutputGainValue(), delays)
		},
	}
}
