<style lang="sass" scoped>
#tracker {
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    .step {
        justify-self: center;
        width: 2vw;
        height: 1vh;
        &.inactive {
            background-color: #995574;
        }
        &.active {
            background-color: #ff5574;
        }
    }
}
</style>

<template>
    <div id="tracker">
        <div v-for="step in steps" :key="step.id" 
            class="step" :class="[step.state]"></div>
    </div>
</template>

<script>
import { times } from 'ramda'
import { Dispatcher, Events } from '../wasa/common/dispatcher'

export default {
    created() {
        Dispatcher.as(Events.SEQUENCER_TICK)
            .subscribe((tick) => {
                const step = this.steps.find(step => step.state === 'active')
                if(step) {
                    step.state = 'inactive'
                }
                this.steps[tick-1].state = 'active'
            })
        Dispatcher.as(Events.SEQUENCER_STOP)
            .subscribe(() => {
                this.steps.forEach((step) => {
                    step.state = 'inactive'
                })
            })
    },
    methods: {},
    data: () => ({
        steps: times((n) => ({ state: 'inactive' }), 16)
    })
}
</script>

