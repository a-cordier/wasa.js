<style lang="scss"  type="text/scss" scoped>
#sequencer {
    padding: 10px 10px 10px 10px;
    background-color: #444;
    margin-top: 10px;
    .tracker {
        margin: 20px 0 10px 0;
    }
	.panel {
		display: flex;
		.slice {
			margin-right: 10px;
		}
	}
}
</style>

<template>
    <div id="sequencer">
        <drum-track :drum="hi"></drum-track>
        <drum-track :drum="hat"></drum-track>
        <drum-track :drum="sn"></drum-track>
        <drum-track :drum="bd1"></drum-track>
        <drum-track :drum="bd2"></drum-track>
        <step-tracker class="tracker"></step-tracker>
		<div class="panel">
			<bd-panel :drum="bd1" class="slice"></bd-panel>
			<bd-panel :drum="bd2" class="slice"></bd-panel>
			<sn-panel :drum="sn" class="slice"></sn-panel>
		</div>
    </div>
</template>

<script>
import StepTracker from './step-tracker'
import DrumTrack from './drum-track'
import BdPanel from './bd-panel'
import SnPanel from './sn-panel'
import { Kick, Snare, Hat } from 'wasa'
import { audioContext } from '../audio-context'

const bd1 = Kick(audioContext)
    .setDurationValue(1)
    .setFrequencyValue(100)
	.setFinalFrequencyValue(0.01)
	.setOutputGainValue(0.5)
bd1.connect({ input: audioContext.destination })

const bd2 = Kick(audioContext)
    .setDurationValue(1)
    .setFrequencyValue(120)
	.setFinalFrequencyValue(0.01)
	.setOutputGainValue(0.5)
bd2.connect({ input: audioContext.destination })

const sn = Snare(audioContext)
	.setFrequencyValue(350)
	.setOscMixValue(0.5)
sn.connect({ input: audioContext.destination })

const hi = Hat(audioContext)
    .setDuration(0.75)
hi.connect({ input: audioContext.destination })

const hat = Hat(audioContext)
    .setDuration(0.1)
hat.connect({ input: audioContext.destination })

export default {
    components: {
        StepTracker,
        DrumTrack,
        BdPanel,
		SnPanel,
    },
    created() {

    },
    data: () => ({
        bd1,
        bd2,
        sn,
        hi,
        hat,
    })
}
</script>
