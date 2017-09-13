import { Dispatcher, Events } from './sound/core/dispatcher'
import { Sequencer } from './sound/core'

export const SequencerComponent = ({ audioContext }) => {
	const sequencer = Sequencer({ audioContext })
		.onPlay((tick) => {
			console.log('tick', tick)
			if (tick % 64 === 0 && Math.random() > 0.5) {
				const osc = audioContext.createOscillator()
				osc.connect(audioContext.destination)
				osc.frequency.value = 220 + (220 * Math.random())
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
