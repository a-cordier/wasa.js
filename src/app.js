import { SequencerComponent } from './sequencer-component'
import { Dispatcher, Events } from './common/dispatcher'

const App = () => {
	const audioContext = new AudioContext()
	return {
		bootstrap() {
			SequencerComponent({ audioContext })
			Dispatcher.subscribe(Events.CHANGE, (data) => {
				console.log(data)
			})
		},
	}
}

App().bootstrap()
