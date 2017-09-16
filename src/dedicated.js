import { ipcRenderer as ipc } from 'electron'
import { Sequencer } from './wasa/core'
import { audioContext } from './audioContext'

let t = 0

const sequencer = Sequencer({ audioContext })
	.onPlay((tick) => {
		if (tick % 12 === 0) {
			ipc.send('sequencer-tick', tick)
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
