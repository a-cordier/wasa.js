<style lang="sass" scoped>
#step {
    .step {        
        width: 3vw;
        height: 3vw;            
        &.inactive {
            background-color: #ccc;
            box-shadow: 0px 4px 1px 1px rgba(0,0,0,0.3), inset 0px 0px 0px 1px rgba(0,0,0,0.1);
            transition: all 0.1s ease-in-out;
        }
        &.active {
            background-color: #8ab9b5;
            box-shadow: 0px 0px 2px 0px #8ab9b5;
        }
        cursor: pointer;
    }
    .knob {
        margin: 10px auto 0 auto;
    }
}
</style>

<template>
    <div id="step">
        <div class="step" :class="[state]" @click="toggleState()"></div>
        <knob class="knob" :value="velocity" @update="setVelocity"></knob>
    </div>
</template>

<script>
import { isNil } from 'ramda'
import { Dispatcher, Events } from '../wasa/common/dispatcher'
import { audioContext } from '../audio-context'
import Knob from './knob'

export default {
    props: {
        tick: { type: Number },
        drum: { type: Object }
    },
    components: {
        Knob,
    },
    created() {
        Dispatcher.as(Events.SEQUENCER_TICK)
            .subscribe((tick) => {
                if (this.state === 'active' && tick === this.tick) {
                    this.drum.noteOff(audioContext.currentTime)
                    this.drum.noteOn(audioContext.currentTime, this.velocity)

                }
            })
    },
    data: () => ({
        state: 'inactive',
        velocity: 0.5,
    }),
    methods: {
        toggleState() {
            this.state = this.state === 'active' ? 'inactive' : 'active'
        },
        setVelocity(value) {
            this.velocity = value
        },
    },
}
</script>
