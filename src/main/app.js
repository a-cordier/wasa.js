import { Sequencer, AudioModel } from './sound/core'

const App = () => {
	const audioContext = new AudioContext()
	return {
		bootstrap() {
			Sequencer({ audioContext })
				.onPlay((stTime, currentTick) => {
					if (currentTick % 16 === 0 && Math.random() > 0.5) {
						const osc = audioContext.createOscillator()
						osc.connect(audioContext.destination)
						osc.frequency.value = 440 + (440 * Math.random())
						osc.start()
						osc.stop(audioContext.currentTime + 0.25)
					}
				}).start()
		},
	}
}

App().bootstrap()
