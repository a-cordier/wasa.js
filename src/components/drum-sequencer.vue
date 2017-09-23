<style lang="sass" scoped>
#sequencer {
    padding: 10px 10px 10px 10px;

    background-color: #444;
    margin-top: 10px;
}
</style>

<template>
    <div id="sequencer">
        <drum-track></drum-track>
        <drum-track></drum-track>
        <drum-track :drum="hat"></drum-track>
        <drum-track :drum="snare"></drum-track>
        <drum-track :drum="kick"></drum-track>
        <step-tracker></step-tracker>
    </div>
</template>

<script>
import StepTracker from './step-tracker'
import DrumTrack from './drum-track'
import { Kick } from '../wasa/blocks/kick'
import { Snare } from '../wasa/blocks/snare'
import { Hat } from '../wasa/blocks/hat'
import { audioContext } from '../audio-context'

const kick = Kick({ audioContext })
kick.connect({ input: audioContext.destination })

const snare = Snare({ audioContext })
snare.connect({ input: audioContext.destination })

const hat = Hat({ audioContext })
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
        hat,
    })
}
</script>
