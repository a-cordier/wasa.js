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
        <drum-track></drum-track>
        <drum-track :drum="hi"></drum-track>
        <drum-track :drum="hat"></drum-track>
        <drum-track :drum="snare"></drum-track>
        <drum-track :drum="kick"></drum-track>
        <step-tracker class="tracker"></step-tracker>
    </div>
</template>

<script>
import StepTracker from './step-tracker'
import DrumTrack from './drum-track'
import { Kick, Snare, Hat } from 'wasa'
import { audioContext } from '../audio-context'

const kick = Kick({ audioContext })
    .setDuration(0.75)
    .setFreq(80)
    .setFinalFreq(1)
kick.connect({ input: audioContext.destination })

const snare = Snare({ audioContext })
snare.connect({ input: audioContext.destination })

const hi = Hat({ audioContext })
    .setDuration(0.75)
hi.connect({ input: audioContext.destination })

const hat = Hat({ audioContext })
    .setDuration(0.1)
hat.connect({ input: audioContext.destination })

export default {
    components: {
        StepTracker,
        DrumTrack,
    },
    created() {

    },
    data: () => ({
        kick,
        snare,
        hi,
        hat,
    })
}
</script>
