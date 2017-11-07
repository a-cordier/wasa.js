<style lang="sass" scoped>
#sequencer {
    padding: 10px 10px 10px 10px;
    background-color: #444;
    margin-top: 10px;
    .tracker {
        margin-top: 20px 0 10px 0;
    }
}
</style>

<template>
    <div id="sequencer">
        <drum-track :drum="hi"></drum-track>
        <drum-track :drum="hat"></drum-track>
        <drum-track :drum="snare"></drum-track>
        <drum-track :drum="bd1"></drum-track>
        <drum-track :drum="bd2"></drum-track>
        <step-tracker class="tracker"></step-tracker>
    </div>
</template>

<script>
import StepTracker from './step-tracker'
import DrumTrack from './drum-track'
import BdPanel from './bd-panel'
import { Kick, Snare, Hat } from 'wasa'
import { audioContext } from '../audio-context'

const bd1 = Kick(audioContext)
    .setDuration(0.75)
    .setFrequency(80)
    .setFinalFrequency(1)
bd1.connect({ input: audioContext.destination })

const bd2 = Kick(audioContext)
    .setDuration(0.75)
    .setFrequency(100)
    .setFinalFrequency(1)
bd2.connect({ input: audioContext.destination })

const snare = Snare(audioContext)
snare.connect({ input: audioContext.destination })

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
    },
    created() {

    },
    data: () => ({
        bd1,
        bd2,
        snare,
        hi,
        hat,
    })
}
</script>
