<style lang="scss" type="text/scss" scoped>
 .transport {
	 width: 300px;
	 display: grid;
	 grid-template-columns: repeat(16, 1fr);
	 align-items: flex-end;
	 button {
		 display: inline-block;
		 position: relative;
		 width: 50px;
		 height: 50px;
		 border: none;
		 background-color: #444;
		 color: #8ab9b5;
		 margin: 5px 5px 0px 0px;
		 transition: 0.2s;
		 transition-delay: 0.2s;
		 box-shadow: 0 1px 2px 0 rgba(0, 12, 12, .2);
		 cursor: pointer;
		 :focus {
			 outline: 0;
		 }
		 i {
			 font-size: 1.2vw;
		 }
	 }
	 .tempo-spin-box {
		 height: 50px;
		 display: inline-grid;
	 }

}
</style>

<template>
    <div class="transport">
        <button class="start" @click="start">
            <i class="fa fa-play" aria-hidden="true"></i>
        </button>
        <button classs="stop" @click="stop">
            <i class="fa fa-stop" aria-hidden="true"></i>
        </button>
		<spin-box class="tempo-spin-box" :min=1 :max=200 :step=1 :precision=2 :init=120
				  @change="changeTempo"></spin-box>
    </div>
</template>

<script>
import { Dispatcher, Events } from 'wasa'
import Knob from './knob'
import SpinBox from './spin-box.vue'

export default {
    components: {
        Knob,
		SpinBox,
    },
    methods: {
        start() {
            Dispatcher.dispatch(Events.SEQUENCER_START)
        },
        stop() {
            Dispatcher.dispatch(Events.SEQUENCER_STOP)
        },
		changeTempo(value) {
			Dispatcher.dispatch(Events.TEMPO_CHANGE, value)
		},
    }
}
</script>

