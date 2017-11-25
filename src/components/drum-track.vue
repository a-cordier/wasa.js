<style lang="scss" type="text/scss" scoped>

	#track {
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    .grid-item {
        justify-self: center;
    }
}
</style>

<template>
    <div id="track">
        <template v-for="step in steps">
            <drum-step :key="step.id" :drum="drum" :tick="step.tick" class="grid-item"></drum-step>
        </template>
    </div>
</template>

<script>
import { times } from 'ramda'
import { Dispatcher, Events } from 'wasa'
import DrumStep from './drum-step'

export default {
    props: ['drum'],
    components: {
        DrumStep,
    },
    data: () => ({
        steps: times((n) => ({ tick: (n + 1), id: n }), 16)
    })
}
</script>
