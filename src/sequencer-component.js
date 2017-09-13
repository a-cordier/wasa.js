import { Dispatcher, Events } from './common/dispatcher'
import { Sequencer } from './core'

export const SequencerComponent = ({ audioContext }) => {
	let t = 0
	const sequencer = Sequencer({ audioContext })
		.onPlay((tick) => {
			if (tick % 30 === 0) {
				const osc = audioContext.createOscillator()
				osc.connect(audioContext.destination)
				osc.frequency.value = t % 4 === 0 ? 1200 : 800
				osc.type = 'triangle'
				osc.start()
				osc.stop(audioContext.currentTime + 0.1)
				t += 1
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
