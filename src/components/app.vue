<style>

</style>

<template>
	<div id="wasa-app">
		<transport></transport>
		<drum-sequencer></drum-sequencer>
	</div>
</template>

<script>
	import {audioContext} from '../audio-context'
	import {Sequencer, Dispatcher, Events} from 'wasa'
	import Transport from './transport'
	import DrumSequencer from './drum-sequencer'

	export default {
		created() {
			this.sequencer = Sequencer(audioContext)
				.onTick((tick, tempo, division) => {
					Dispatcher.dispatch(Events.SEQUENCER_TICK, tick)
				})
			Dispatcher.as(Events.SEQUENCER_START)
				.subscribe(() => {
					this.sequencer.start()
				})
			Dispatcher.as(Events.SEQUENCER_STOP)
				.subscribe(() => {
					this.sequencer.stop()
				})
			Dispatcher.as(Events.TEMPO_CHANGE)
				.subscribe(({value}) => {
					this.sequencer.setTempo({value});
				})
		},
		components: {
			Transport,
			DrumSequencer,
		}
	}
</script>
