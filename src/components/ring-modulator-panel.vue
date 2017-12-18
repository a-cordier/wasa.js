<style lang="scss"  type="text/scss" scoped>
	#rm-panel {

.parameters {

	.knob {
			display: block;
			width: 60px;
			margin: 10px auto 0 auto;
		}
	}
}

</style>

<template>
<div id="rm-panel">
	<div class="parameters">
	<knob class="knob" :value="getRingModulationValue()" @update="setRingModulationValue" :label="'ring.'"></knob>
	<knob class="knob" :value="getDelayTimeValue()" @update="setDelayTimeValue" :label="'delay'"></knob>
	<knob class="knob" :value="getLfoGainValue()" @update="setLfoGainValue" :label="'lfo gain'"></knob>
	</div>
	</div>
	</template>

	<script>
import Knob from "./knob.vue"
import { unscale, scale } from "wasa"

export default {
	props: {
		ringModulator: { type: Object }
	},
	components: {
		Knob
	},
	created() {
	},
	data: () => ({}),
	methods: {
		setRingModulationValue(value) {
			this.ringModulator.setRingModulationValue(unscale({ min: 0.1, max: 18000 }, value))
		},
		getRingModulationValue() {
			return scale({ min: 0.1, max: 18000 }, this.ringModulator.getRingModulationValue())
		},
		setDelayTimeValue(value) {
			this.ringModulator.setDelayTimeValue(unscale({ min: 1E-10, max: 1 }, value))
		},
		getDelayTimeValue() {
			return scale({ min: 1E-10, max: 1 }, this.ringModulator.getDelayTimeValue())
		},
		setLfoGainValue(value) {
			this.ringModulator.setLfoGainValue(unscale({ min: 1E-10, max: 1 }, value))
		},
		getLfoGainValue() {
			return scale({ min: 1E-10, max: 1 }, this.ringModulator.getLfoGainValue())
		},
		setOutputGainValue(value) {
			this.ringModulator.setOutputGainValue(value)
		},
		getOutputGainValue() {
			return this.ringModulator.getOutputGainValue()
		}
	}
}
</script>
