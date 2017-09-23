<style lang="sass" scoped>
#track {
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    .grid-item {
        justify-self: center;
        .step {        
            width: 3vw;
            height: 3vw;
            // justify-self: center;
            
            &.inactive {
                background-color: #ccc;
                box-shadow: 0px 4px 1px 1px rgba(0,0,0,0.3), inset 0px 0px 0px 1px rgba(0,0,0,0.1);
                transition: all 0.1s ease-in-out;
            }
            &.active {
                background-color: #8ab9b5;
                // box-shadow: 0px 1px 0px 1px rgba(0,0,0,0.3), inset 0px 0px 0px 1px rgba(0,0,0,0.1);;
                box-shadow: 0px 0px 2px 0px #8ab9b5;

            }
            cursor: pointer;
        }
        .knob {

            margin: 10px auto;
        }
    }
}
</style>

<template>
    <div id="track">
        <template v-for="step in steps">
            <div class="grid-item" :key="step.id">
                <div :key="step.id" class="step" :class="[step.state]" @click="toggleState(step)"></div>
                <knob :key="step.id" class="knob"></knob>
            </div>
        </template>
    </div>
</template>

<script>
import { times } from 'ramda'
import { Dispatcher, Events } from '../wasa/common/dispatcher'
import { audioContext } from '../audio-context'
import Knob from './knob'

export default {
    props: ['drum'],
    components: {
        Knob
    },
    created() {
        Dispatcher.as(Events.SEQUENCER_TICK)
            .subscribe((tick) => {
                if (this.steps[tick - 1].state === 'active') {
                    this.drum.noteOff(audioContext.currentTime)
                    this.drum.noteOn()
                }
            })
        Dispatcher.as(Events.SEQUENCER_STOP)
            .subscribe(() => {

            })
    },
    data: () => ({
        steps: times((n) => ({ state: 'inactive', id: n }), 16)
    }),
    methods: {
        toggleState(step) {
            step.state = step.state === 'active' ? 'inactive' : 'active'
        },
    }
}
</script>
