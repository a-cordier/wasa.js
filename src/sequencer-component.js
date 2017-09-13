import { Dispatcher, Events } from './common/dispatcher'
import { Sequencer } from './core'

export const SequencerComponent = ({ audioContext }) => {
	const sequencer = Sequencer({ audioContext })
		.onPlay((tick) => {
			if (tick % 30 === 0) {
				const osc = audioContext.createOscillator()
				osc.connect(audioContext.destination)
				osc.frequency.value = 100
				osc.type = 'square'
				osc.start()
				osc.stop(audioContext.currentTime + 0.25)
			}
		})
		.start()

	customElements.define('wasa-sequencer', class extends HTMLElement {
		constructor() {
			super()
			this.root = this.attachShadow({ mode: 'open' })
		}

		connectedCallback() {
			this.root.innerHTML = `
				<button id="start">START</button>
				<button id="stop">STOP</button>
			`
			this.root.querySelector('#start').addEventListener('click', () => {
				sequencer.start()
				Dispatcher.dispatch({
					type: Events.CHANGE,
					data: 'start sequencer',
				})
			})
			this.root.querySelector('#stop').addEventListener('click', () => {
				sequencer.stop()
				Dispatcher.dispatch({
					type: Events.CHANGE,
					data: 'stop sequencer',
				})
			})
		}
	})
}
