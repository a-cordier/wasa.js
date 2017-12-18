<style lang="scss"  type="text/scss" scoped>
#sequencer {
    padding: 10px 10px 10px 10px;
    background-color: #444;
    margin-top: 10px;
	width: 850px;
    .tracker {
        margin: 20px 0 10px 0;
    }
	.panel {
		margin-top: 10px;
		display: grid;
		grid-template-columns: repeat(16, 1fr);
		.grid-item {
			justify-self: center;
		}
	}
}
</style>

<template>
    <div id="sequencer">
        <drum-track :drum="hi"></drum-track>
        <drum-track :drum="hat"></drum-track>
		<drum-track :drum="rim"></drum-track>
		<drum-track :drum="snare"></drum-track>
        <drum-track :drum="bd"></drum-track>
        <step-tracker class="tracker"></step-tracker>
		<div class="panel">
			<bd-panel :drum="bd" class="grid-item"></bd-panel>
			<sn-panel :drum="snare" class="grid-item"></sn-panel>
			<sn-panel :drum="rim" class="grid-item"></sn-panel>
			<hat-panel :drum="hi" class="grid-item"></hat-panel>
			<hat-panel :drum="hat" class="grid-item"></hat-panel>
			<delay-panel :delay="delayBroker" class="grid-item"></delay-panel>
		</div>
    </div>
</template>

<script>
import StepTracker from './step-tracker'
import DrumTrack from './drum-track'
import BdPanel from './bd-panel'
import SnPanel from './sn-panel'
import DelayPanel from './delay-panel'
import HatPanel from './hat-panel'
import RingModulatorPanel from './ring-modulator-panel'

import BassDrum from '../core/drum-sequencer/bass-drum'
import HiHat from '../core/drum-sequencer/hi-hat'
import Snare from '../core/drum-sequencer/snare'
import RimShot from '../core/drum-sequencer/rim-shot'
import DelayBroker from '../core/drum-sequencer/delay-broker'

import { audioContext } from '../audio-context'
import { range } from 'ramda'

const bd = BassDrum(audioContext)
const snare = Snare(audioContext)
const rim = RimShot(audioContext)
const hi = HiHat(audioContext)
const hat = HiHat(audioContext)
const delayBroker = DelayBroker(audioContext)

export default {
    components: {
        StepTracker,
        DrumTrack,
        BdPanel,
		SnPanel,
		HatPanel,
		DelayPanel,
    },
    created() {

    },
    data: () => ({
        bd,
        snare,
		rim,
        hi,
        hat,
		delayBroker,
    })
}
</script>
