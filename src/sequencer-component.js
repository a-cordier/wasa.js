import { ipcRenderer as ipc } from 'electron'

export const SequencerComponent = () => {
	ipc.on('new-note', (event, data) => {
		console.log(data)
	})
	customElements.define('wasa-sequencer', class extends HTMLElement {
		constructor() {
			super()
			this.root = this.attachShadow({ mode: 'open' })
		}

		connectedCallback() {
			this.root.innerHTML = `
				<style>
				 button {
					 background-color: #b4d455;
					 border: 0;
					 box-shadow:none;
					 border-radius: 0px;
					 color: #fff;
				 }
				</style>
				<input id="tempo" type="range" min="0" max="100"/>
				<button id="start">START</button>
				<button id="stop">STOP</button>
			`
			this.root.querySelector('#start').addEventListener('click', () => {
				ipc.send('sequencer-start')
			})
			this.root.querySelector('#stop').addEventListener('click', () => {
				ipc.send('sequencer-stop')
			})
			this.root.querySelector('#tempo').addEventListener('input', (event) => {
				ipc.send('tempo-changed', Number(event.target.value))
			})
		}
	})
}
