import { ipcRenderer as ipc } from 'electron'
import { audioContext, Sequencer } from './core'

let t = 0
const sequencer = Sequencer({ audioContext })
	.onPlay((tick) => {
		if (tick % 30 === 0) {
			ipc.send('new-note', 'new note')
			const osc = audioContext.createOscillator()
			osc.connect(audioContext.destination)
			osc.frequency.value = t % 4 === 0 ? 1200 : 800
			osc.type = 'triangle'
			osc.start()
			osc.stop(audioContext.currentTime + 0.1)
			t += 1
		}
	})

ipc.on('sequencer-start', () => {
	sequencer.start()
})
ipc.on('sequencer-stop', () => {
	sequencer.stop()
})
