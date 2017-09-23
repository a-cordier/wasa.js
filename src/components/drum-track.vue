<style lang="sass" scoped>
#track {
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    .step {
        justify-self: center;
        width: 3vw;
        height: 3vw;
        &.inactive {
            background-color: #ccc;
        }
        &.active {
            background-color: #8ab9b5;
        }
        cursor: pointer;
    }
}
</style>

<template>
    <div id="track">
        <div v-for="step in steps" :key="step.id" class="step" v-bind:class="[step.state]" v-on:click="toggleState(step)"></div>
    </div>
</template>

<script>
import { times } from 'ramda'
import { Dispatcher, Events } from '../wasa/common/dispatcher'
import { audioContext } from '../audio-context'

export default {
    props: ['drum'],
    created() {
        Dispatcher.as(Events.SEQUENCER_TICK)
            .subscribe((tick) => {
                if (this.steps[tick-1].state === 'active') {
                    this.drum.noteOff(audioContext.currentTime)
                    this.drum.noteOn()
                }
            })
        Dispatcher.as(Events.SEQUENCER_STOP)
            .subscribe(() => {

            })
    },
    data: () => ({
        steps: times((n) => ({ state: 'inactive' }), 16)
    }),
    methods: {
        toggleState(step) {
            step.state = step.state === 'active' ? 'inactive' : 'active'
        },
    }
}
</script>
