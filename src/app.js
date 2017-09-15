import { SequencerComponent } from './sequencer-component'
import { audioContext } from './core'

const App = () => ({
	bootstrap() {
		SequencerComponent({ audioContext })
	},
})

App().bootstrap()
